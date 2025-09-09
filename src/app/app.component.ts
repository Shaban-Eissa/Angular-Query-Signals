import { Component } from '@angular/core';
import { RepoListComponent } from "./Components/repo-list/repo-list.component";

@Component({
  selector: 'app-root',
  imports: [RepoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
