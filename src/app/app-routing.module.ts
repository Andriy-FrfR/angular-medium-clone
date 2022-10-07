import { FavoritedArticlesComponent } from './pages/profile-page/components/favorited-articles/favorited-articles.component';
import { MyArticlesComponent } from './pages/profile-page/components/my-articles/my-articles.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
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
    path: 'article/:slug',
    component: ArticlePageComponent,
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent,
    children: [
      { path: '', component: MyArticlesComponent },
      { path: 'favorites', component: FavoritedArticlesComponent },
    ],
  },
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
  {
    path: 'editor/:slug',
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
