import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [AsyncPipe, NzButtonModule, NzIconModule],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.scss'
})
export class UploadPhotoComponent {
  uploadPercent: Observable<number | undefined> | undefined;
  downloadURL: Observable<string> | undefined;

  constructor(private storage: AngularFireStorage) {}

  uploadFile(event: any) {
    const file = event.target.files[0]; 
    const filePath = `fotos-boda/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
      })
    ).subscribe();
  }
}
