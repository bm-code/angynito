import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'thanks', component: ThankYouComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
