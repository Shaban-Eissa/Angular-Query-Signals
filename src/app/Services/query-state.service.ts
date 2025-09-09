import { Injectable, signal, Signal, effect, EffectRef } from '@angular/core';

interface IQuery<T> {
  data: Signal<T | null>;
  isLoading: Signal<boolean>;
  error: Signal<unknown>;
  refetch: () => void;
  invalidate: () => void;
}

interface QueryOptions {
  enabled?: Signal<boolean>;
  staleTime?: number; // in ms
}

@Injectable({ providedIn: 'root' })
export class QueryState {
  private queries = new Map<string, IQuery<unknown>>();
  private effects = new Map<string, EffectRef>();
  private lastFetched = new Map<string, number>();

  query<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: QueryOptions = {}
  ): IQuery<T> {
    if (this.queries.has(key)) {
      return this.queries.get(key)! as IQuery<T>;
    }

    const data = signal<T | null>(null);
    const isLoading = signal<boolean>(false);
    const error = signal<unknown>(null);

    const cached = localStorage.getItem(`query-${key}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { result: T; time: number };
        data.set(parsed.result);
        this.lastFetched.set(key, parsed.time);
      } catch {
        // ignore bad JSON
      }
    }

    const load = async () => {
      // staleTime check
      const last = this.lastFetched.get(key);
      if (
        options.staleTime &&
        last &&
        Date.now() - last < options.staleTime
      ) {
        return; // still fresh
      }

      isLoading.set(true);
      error.set(null);
      try {
        const result = await fetcher();
        data.set(result);

        this.lastFetched.set(key, Date.now());
        localStorage.setItem(
          `query-${key}`,
          JSON.stringify({ result, time: Date.now() })
        );
      } catch (err) {
        error.set(err);
      } finally {
        isLoading.set(false);
      }
    };

    // Only run the query if enabled is true (or not provided)
    if (options.enabled) {
      const effectRef = effect(() => {
        if (options.enabled!()) {
          load();
        }
      });
      this.effects.set(key, effectRef);
    } else {
      load();
    }

    const state: IQuery<T> = {
      data,
      isLoading,
      error,
      refetch: load,
      invalidate: async () => {
        data.set(null);
        this.lastFetched.delete(key);
        localStorage.removeItem(`query-${key}`);
        load();
      },
    };

    this.queries.set(key, state);
    return state;
  }

  invalidateQuery(key: string): void {
    if (this.queries.has(key)) {
      const query = this.queries.get(key)!;
      query.invalidate();
    }
  }

  invalidateQueries(): void {
    this.queries.forEach((query, key) => {
      query.invalidate();
    });
  }
}
