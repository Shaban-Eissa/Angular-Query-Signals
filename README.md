# Building TanStack Query

This project is a custom implementation of TanStack Query concepts in Angular 19, powered by Signals. It demonstrates how modern Angular's reactivity model can be used to handle server state management declaratively, without external libraries.

<img style="width:100%; height:auto" alt="1708548198881" src="https://github.com/user-attachments/assets/794ceb90-d712-43d4-b7fb-f331e7688ca6" />


## Features

- **GitHub Repository Explorer**: Fetch and display repository information from a specific GitHub user
- **Custom Query State Management**: Built-in data fetching, caching, and state management using Angular signals
- **Loading & Error States**: Visual indicators for loading and error states
- **Local Storage Persistence**: Cached data persists between sessions
- **Manual Refetching**: Ability to manually trigger data refresh with updated timestamp
- **Modern UI Design**: Clean and responsive interface built with TailwindCSS v4
- **Responsive Layout**: Optimized for all device sizes with a mobile-first approach


## Technologies Used

- **Angular 19**: Latest version with standalone components and signals
- **Custom Query State Service**: Custom implementation of TanStack Query concepts
- **TailwindCSS v4**: Utility-first CSS framework for modern styling
- **TypeScript**: Type-safe JavaScript for robust development
- **GitHub API**: For fetching repository data from specific users

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Shaban-Eissa/Angular-Query-Signals.git
cd Angular-Query-Signals
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`


## How Query State is Implemented

This project demonstrates a custom implementation of query state management using Angular signals. The `query-state.service.ts` provides:

- Custom query hooks with Angular signals
- Configurable caching with staleTime
- Loading and error states
- Local storage persistence for cached data
- Data invalidation and manual refetching

## 🙏 Acknowledgments

- [Angular Team](https://angular.dev) for the amazing framework and signals API
- [TanStack Query](https://tanstack.com/query/latest) for the inspiration and concepts
- [TailwindCSS](https://tailwindcss.com) for the utility-first CSS framework
- [GitHub API](https://docs.github.com/en/rest) for the repository data

