import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { ProjectContent } from '../project-content';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article>
      <img class="listing-photo" [src]="projectDetail?.title_image"
        alt="{{projectDetail?.title_alt}}"/>
      <section class="listing-description">
        <a [routerLink]="['/projects/edit', projectDetail?.id]">Edit</a>
        <button type="button" (click)="deleteWarning.show()" class="save">Delete</button>
        <dialog #deleteWarning class="dialog"> 
          <div>
            <p>Are you sure you want to delete Project: {{projectDetail?.title}}?</p>
            <button type="button" (click)=deleteProject() class="save">Delete</button>
            <button type="button" (click)=this.deleteWarning.close() class="save">Cancel</button>
          </div>
        </dialog>
        <h2 class="listing-heading">{{projectDetail?.title}}</h2>
        <p class="listing-location">{{projectDetail?.tagline}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">What we did</h2>
        <p>{{ projectDetail?.what_content}}</p>
        <h2 class="section-heading">How we did it</h2>
        <p>{{ projectDetail?.how_content}}</p>
        <h2 class="section-heading">Statistics: {{projectDetail?.statistics}}</h2>
        <img class="showcase-photo" [src]="projectDetail?.showcase_image"
        alt="{{projectDetail?.showcase_alt}}"/>
      </section>
    </article>
`,
  styleUrl: './content.component.css'
})
export class ContentComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectsService = inject(ProjectsService);
  projectDetail: ProjectContent | undefined;

  url = 'http://localhost:4200/projects';

  constructor(private router: Router) {
    const projectDetailId = parseInt(this.route.snapshot.params['id']);
  
    this.projectsService.getProjectById(projectDetailId).then(projectDetail => {
      this.projectDetail = projectDetail;
    })
  }

  deleteProject() {
    const projectDetailId = parseInt(this.route.snapshot.params['id']);
    this.projectsService.deleteProject(projectDetailId).then(() => {
      this.router.navigate(["/projects"])
    })
  }
}
