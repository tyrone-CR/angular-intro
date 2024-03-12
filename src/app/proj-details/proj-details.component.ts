import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjectContent } from '../project-content';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-proj-details',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="projectDetail.title_image" alt="{{projectDetail.title_alt}}">
    <h2 class="listing-heading">{{ projectDetail.title }}</h2>
    <p class="listing-location">{{ projectDetail.tagline}}</p>
    <a [routerLink]="['/projects', projectDetail.id]">Learn More</a>
  </section>
  `,
  styleUrl: './proj-details.component.css'
})
export class ProjDetailsComponent {

  @Input() projectDetail!: ProjectContent;

}
