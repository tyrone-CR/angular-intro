import { Injectable } from '@angular/core';
import { ProjectContent, UpdateProjectContent } from './project-content';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  url = 'http://localhost:3000/projects';

  async getAllProjects(): Promise<ProjectContent[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getProjectById(id: number): Promise<ProjectContent | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  async submitEdit(
    id: number,
    update: UpdateProjectContent): Promise<ProjectContent> {

    // uses fetch defined as a patch
    return fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update)
    })
    .then(response => response.json())
  }

  async createProject(
    newContent: ProjectContent): Promise<ProjectContent> {
    console.log(newContent.id)

    return fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newContent)
    })
    .then(response => response.json())
  }

  async deleteProject(projectDetailId: number) {
      fetch(`${this.url}/${projectDetailId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
  }

}
