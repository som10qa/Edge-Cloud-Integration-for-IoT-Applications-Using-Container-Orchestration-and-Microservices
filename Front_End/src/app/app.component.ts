import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { SensorComponent } from './sensor/sensor.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, AuthComponent, SensorComponent, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Edge-Cloud IoT Angular App';

  constructor() {
    console.log('AppComponent constructor called');
  }

  ngOnInit(): void {
    console.log('AppComponent initialized');
  }
}
