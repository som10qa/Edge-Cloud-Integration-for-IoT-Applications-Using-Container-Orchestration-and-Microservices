import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  standalone: true,
  selector: 'app-sensor',
  imports: [CommonModule, FormsModule],
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensor = 'light';
  value = 0;
  message = '';
  data: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  submit(): void {
    this.apiService.postSensorData(this.sensor, this.value).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Data posted successfully';
        this.fetchData();
      },
      error: (err: any) => {
        this.message = 'Submission failed';
      }
    });
  }

  fetchData(): void {
    this.apiService.getSensorData().subscribe({
      next: (res: any) => {
        this.data = res.data ? res.data : [];
      },
      error: (err: any) => {
        console.error('Fetch failed', err);
      }
    });
  }
}