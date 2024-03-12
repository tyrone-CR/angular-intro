import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectContent } from '../project-content';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-project-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule],
  template: `
  <section class="listing-apply">
    <h2 class="section-heading">Create new project: </h2>
      <form [formGroup]="newForm" (ngSubmit)="createProject()" novalidate>
        <label for="title">Title: </label>
        <textarea id="title" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="title"></textarea>

        <label for="tagline">Tagline: </label>
        <textarea id="tagline" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="tagline"></textarea>

        <label for="title_image">Title Image: </label>
        <textarea id="title_image" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="title_image"></textarea>

        <label for="title_alt">Title image alt: </label>
        <textarea id="title_alt" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="title_alt"></textarea>

        <label for="what_content">What we did: </label>
        <textarea id="what_content" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="what_content"></textarea>

        <label for="statistics">Statistics: </label>
        <textarea id="statistics" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="statistics"></textarea>

        <label for="showcase_image">Showcase Image: </label>
        <textarea id="showcase_image" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="showcase_image"></textarea>

        <label for="showcase_alt">Showcase image alt: </label>
        <textarea id="showcase_alt" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="showcase_alt"></textarea>

        <label for="how_content">How we did it: </label>
        <textarea id="how_content" required type="text" cdkTextareaAutosize cdkAutosizeMinRows="5" formControlName="how_content"></textarea>

        <button type="submit" [disabled]="!newForm.valid" [class.disabled]="!newForm.valid" class="primary save">Save</button>
        <button type="button"  (click)="goBack()" class="primary save">Cancel</button>
    </form>
  </section>
  `,
  styleUrl: './project-new.component.css'
})
export class ProjectNewComponent {
  newForm = new FormGroup({
    title: new FormControl(''),
    tagline: new FormControl(''),
    title_image: new FormControl(''),
    title_alt: new FormControl(''),
    what_content: new FormControl(''),
    statistics: new FormControl(''),
    showcase_image: new FormControl(''),
    showcase_alt: new FormControl(''),
    how_content: new FormControl(''),

  });

  route: ActivatedRoute = inject(ActivatedRoute);
  projectsService = inject(ProjectsService)
  projectDetail: ProjectContent | undefined;

  constructor(private router: Router, private location: Location) {}

  createProject() {
    console.log(this.newForm.value)

    let ranId = (Math.floor(Math.random() * 100)).toString()

    const newContent: ProjectContent = {
      id: ranId ?? '',
      title: this.newForm.value.title ?? '',
      tagline: this.newForm.value.tagline ?? '',
      title_image: this.newForm.value.title_image ?? '',
      title_alt: this.newForm.value.title_alt ?? '',
      what_content: this.newForm.value.what_content ?? '',
      statistics: this.newForm.value.statistics ?? '',
      showcase_image: this.newForm.value.showcase_image ?? '',
      showcase_alt: this.newForm.value.showcase_alt ?? '',
      how_content: this.newForm.value.how_content ?? ''
    }

    this.projectsService.createProject(
      newContent
    ).then(projectDetail => {
      this.projectDetail = projectDetail
      this.router.navigate([`/projects/${projectDetail.id}`])
    })
  }

  goBack() {
    this.location.back()
  }
}
