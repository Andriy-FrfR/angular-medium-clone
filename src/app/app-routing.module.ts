import { AlreadyAuthenticatedGuard } from './shared/guards/already-authenticated.guard';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { NotAuthenticatedGuard } from './shared/guards/not-authenticated.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: 'editor',
    component: EditorPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
