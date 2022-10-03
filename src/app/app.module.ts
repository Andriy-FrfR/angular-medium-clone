import { NotAuthenticatedGuard } from './shared/guards/not-authenticated.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { AlreadyAuthenticatedGuard } from './shared/guards/already-authenticated.guard';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SidebarComponent } from './pages/home-page/components/sidebar/sidebar.component';
import { ArticlesComponent } from './pages/home-page/components/articles/articles.component';
import { LogInterceptor } from './shared/interceptors/log.interceptor';
import { FeedToggleComponent } from './pages/home-page/components/feed-toggle/feed-toggle.component';
import { FavoriteButtonComponent } from './shared/components/favorite-button/favorite-button.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { FollowButtonComponent } from './shared/components/follow-button/follow-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    SettingsPageComponent,
    EditorPageComponent,
    SidebarComponent,
    ArticlesComponent,
    FeedToggleComponent,
    FavoriteButtonComponent,
    ArticlePageComponent,
    ProfilePageComponent,
    FollowButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    NotAuthenticatedGuard,
    AlreadyAuthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
