import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For two-way binding with ngModel
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-notifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: { message: string; timestamp: Date }[] = [];
  notificationMessage: string = '';
  sendStatus: string = '';
  private subscription?: Subscription;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.api.subscribeToNotifications().subscribe({
      next: (msg: string) => {
        // Filter out heartbeat messages if needed
        if (msg.trim().toLowerCase() === 'heartbeat') {
          return;
        }
        // Prepend a timestamp for formatting
        this.notifications.push({ message: msg, timestamp: new Date() });
      },
      error: (err: any) => {
        this.notifications.push({ message: 'Error receiving notifications', timestamp: new Date() });
        console.error('SSE error:', err);
      }
    });
  }

  sendNotification(): void {
    if (!this.notificationMessage.trim()) {
      this.sendStatus = 'Please enter a notification message.';
      return;
    }

    this.api.sendNotification(this.notificationMessage).subscribe({
      next: (res: any) => {
        this.sendStatus = 'Notification sent successfully.';
        this.notificationMessage = '';  // Clear the input after sending
      },
      error: (err: any) => {
        console.error('Error sending notification:', err);
        this.sendStatus = 'Failed to send notification.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
