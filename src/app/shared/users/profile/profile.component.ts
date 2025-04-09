import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../../material/material.module';


export interface TableElement {
  name: string;
  value: string;
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  imports: [MaterialModule],
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  columns: string[] = ['name', 'value'];
  dataSource: TableElement[] = [];

  constructor(private authService: AuthService) {
    let user = authService.getUserInfo()!;
    this.dataSource = [
      { name: "Name", value: user.name},
      { name: "Email", value: `${user.email}` },
    ];
  }
}
