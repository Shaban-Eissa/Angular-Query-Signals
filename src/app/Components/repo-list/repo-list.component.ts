import { Component, inject, signal } from '@angular/core';
import { QueryState } from '../../Services/query-state.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repo-list',
  imports: [DatePipe],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.css'
})
export class RepoListComponent {
  queryState = inject(QueryState);
  lastUpdated = signal<number>(Date.now());

  repos = this.queryState.query(
    'repositories',
    async () => {
      this.lastUpdated.set(Date.now());
      return fetch('https://api.github.com/users/Shaban-Eissa/repos').then(res => res.json());
    },
    { staleTime: 1000 * 60 } // 1 min cache
  );

  refetchData() {
    this.lastUpdated.set(Date.now());
    this.repos.refetch();
  }

  getTotalStars(): number {
    if (!this.repos.data()) return 0;
    return this.repos.data().reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
  }

  getTotalForks(): number {
    if (!this.repos.data()) return 0;
    return this.repos.data().reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0);
  }

  getLastUpdatedTime(): Date {
    return new Date(this.lastUpdated());
  }
}
