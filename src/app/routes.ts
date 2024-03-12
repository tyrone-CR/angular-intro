import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContentComponent } from './content/content.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectNewComponent } from './project-new/project-new.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details'
    },
    {
      path: 'projects',
      component: ProjectsComponent,
      title: 'Projects'
    },
    {
      path: 'projects/new',
      component: ProjectNewComponent,
      title: 'Create new project'
    },
    {
      path: 'projects/:id',
      component: ContentComponent,
      title: 'Project Details'
    },
    {
      path: 'projects/edit/:id',
      component: ProjectEditComponent,
      title: 'Edit Project Content'
    },
    
  ];
  
  export default routeConfig;