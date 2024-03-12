import { Component, inject } from '@angular/core';
import { ProjDetailsComponent } from '../proj-details/proj-details.component';
import { CommonModule } from '@angular/common';
import { ProjectContent } from '../project-content';
import { ProjectsService } from '../projects.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjDetailsComponent,
    RouterLink
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Enter a project name to search">
        <button class="primary" type="button">Search</button>
        <a [routerLink]="['/projects/new']">New</a>
      </form>
    </section>
    <section class="results">
      <app-proj-details 
        *ngFor="let projectDetail of projectDetailList"
        [projectDetail]="projectDetail">
      </app-proj-details>
    </section>
  `,

  styleUrl: '../home/home.component.css'
})

export class ProjectsComponent {
  projectDetailList: ProjectContent[] = [];
  projectsService: ProjectsService = inject(ProjectsService);

  constructor() {

    this.projectsService.getAllProjects().then((projectDetailList: ProjectContent[]) => {
      this.projectDetailList = projectDetailList;
    });
  }

}
