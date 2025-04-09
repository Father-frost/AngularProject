import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { MaterialModule } from '../../material/material.module';
import { SocialLoginComponent } from "../social-login/social-login.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MaterialModule, ReactiveFormsModule, SocialLoginComponent, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    });
  }

  login() {

  
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    if (loginInfo.email!='' && loginInfo.password!='')
    {
      console.log(loginInfo);
    this.authService.login(loginInfo).subscribe({
      next: (res) => {
        console.log('res:' +res)
          if (res == null)
            this.snackBar.open('Credential are invalid!', 'OK');
          else if (res == 'unapproved')
            this.snackBar.open('Your account is not Aprooved by Admin!', 'OK');
            else if (res == 'blocked')
            this.snackBar.open('Your account is BLOCKED. Please go to admin office to Unblock.', 'OK');
          else {
              localStorage.setItem('access_token', res);
              this.authService.userStatus.next("loggedIn");
            }
          },
        });
      }else{
        this.snackBar.open('Credential are invalid!', 'OK');
      }
  }
}
