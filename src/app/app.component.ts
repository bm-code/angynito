import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularFireModule, AngularFireStorageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  constructor() { }

}
