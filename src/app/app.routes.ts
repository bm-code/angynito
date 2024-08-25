import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'thanks', component: ThankYouComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {path: '**', redirectTo: ''}
];
