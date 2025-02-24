import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInfoComponent } from "./users/user-info/user-info.component";
import { MoreInfoButtonComponent } from "./users/more-info-button/more-info-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserInfoComponent, MoreInfoButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
