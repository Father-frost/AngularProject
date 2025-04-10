import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './shared/users/profile/profile.component';
import { SignedGuard } from './shared/guards/signed.guard';
import { RegisterComponent } from './auth/register/register.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

export const routes: Routes = [
  { path: '', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [SignedGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [SignedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'book-list', component: BookListComponent ,canActivate: [AuthGuard]},
  { path: 'book-add', component: BookAddComponent ,canActivate: [AuthGuard]},
  { path: 'update/:id', component: BookEditComponent,canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];
