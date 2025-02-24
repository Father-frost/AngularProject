import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserBriefModel } from '../../../models/UserBriefModel';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
   userInfo: UserBriefModel = {
     firstName: 'Ivan', lastName: 'Ivanov', tgLink: '@iivanov'
};

}

