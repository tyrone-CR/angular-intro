import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectContent, UpdateProjectContent } from '../project-content';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule],
  template: `
  <section class="listing-apply">
    <h2 class="section-heading">Edit project details:</h2>
      <form [formGroup]="editForm" (ngSubmit)="submitEdit()" novalidate>
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

        <div>
          <button type="submit" [disabled]="!editForm.valid" class="primary save">Save</button>
          <button type="button"  (click)="goBack()" class="primary save">Cancel</button>
        </div>
    </form>
  </section>
  `,
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent {
  // form creation
  editForm = new FormGroup({
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

  constructor(private router: Router,private location: Location) {
    // gets id from the URL
    const projectDetailId = parseInt(this.route.snapshot.params['id']).toString();

    // takes getProjectById and feeds the id. Then sets project detail object
    this.projectsService.getProjectById(projectDetailId).then(projectDetail => {
      this.projectDetail = projectDetail;

    this.initForm();
    })
  }

  submitEdit() {
    if (!this.projectDetail)
      return;

    console.log(this.editForm.value)
    
    // taken data into an object and named it - pass to service
    const update: UpdateProjectContent = {
      title: this.editForm.value.title ?? '',
      tagline: this.editForm.value.tagline ?? '',
      title_image: this.editForm.value.title_image ?? '',
      title_alt: this.editForm.value.title_alt ?? '',
      what_content: this.editForm.value.what_content ?? '',
      statistics: this.editForm.value.statistics ?? '',
      showcase_image: this.editForm.value.showcase_image ?? '',
      showcase_alt: this.editForm.value.showcase_alt ?? '',
      how_content: this.editForm.value.how_content ?? ''
    }
    this.projectsService.submitEdit(
      this.projectDetail.id,
      update
    ).then(projectDetail => {
      this.projectDetail = projectDetail
      this.router.navigate([`/projects/${projectDetail.id}`])
    });

  }

  initForm() {
    if (!this.projectDetail)
      return;

    // initialise form and patchValue pre-fills the form in 
    this.editForm.patchValue({
      title: this.projectDetail.title,
      tagline: this.projectDetail.tagline,
      title_image: this.projectDetail.title_image,
      title_alt: this.projectDetail.title_alt,
      what_content: this.projectDetail.what_content,
      statistics: this.projectDetail.statistics,
      showcase_image: this.projectDetail.showcase_image,
      showcase_alt: this.projectDetail.showcase_alt,
      how_content: this.projectDetail.how_content
    })
  }

  goBack() {
    this.location.back()
  }
}
