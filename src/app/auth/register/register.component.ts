import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'register',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = fb.group({
      name: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
      rpassword: fb.control('', [Validators.required]),
    });
  }

  register() {
    let user = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this.authService.register(user).subscribe({
      next: (res) => {
        this.snackBar.open(res, 'OK');
      },
    });
  }
}
