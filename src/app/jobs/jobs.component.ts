import { Component, inject } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  private applicationService = inject(ApplicationService);
  private jobService = inject(JobService);

  jobs: any = [];

  constructor() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobService.obtenerEmpleos().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  apply(jobId: number) {
    this.applicationService.applyToJob(jobId).subscribe({
      next: (res) => {
        console.log('Application successful', res);
        // Mostrar un mensaje de éxito
      },
      error: (err) => {
        console.log('Error during application', err);
        // Mostrar un mensaje de error
      }
    });
  }
}
