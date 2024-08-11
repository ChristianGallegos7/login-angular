import { Component, inject } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  private jobService = inject(JobService)

  public jobs:any = [];
  
  constructor(){
    this.empleos();
  }

  empleos(){
    this.jobService.obtenerEmpleos().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
