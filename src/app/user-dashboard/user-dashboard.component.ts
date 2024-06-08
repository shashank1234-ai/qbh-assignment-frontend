import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserListComponent,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

}
