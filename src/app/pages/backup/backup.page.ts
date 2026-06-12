import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { saveAs }
from 'file-saver';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class BackupPage {

  exportBackup() {

    const backup: any = {};

    for (
      let i = 0;
      i < localStorage.length;
      i++
    ) {

      const key =
        localStorage.key(i);

      if (key) {

        backup[key] =
          localStorage.getItem(
            key
          );

      }

    }

    const blob =
      new Blob(
        [
          JSON.stringify(
            backup,
            null,
            2
          )
        ],
        {
          type:
            'application/json'
        }
      );

    saveAs(
      blob,
      'backup-qf.json'
    );

    alert(
      'Backup generado correctamente'
    );

  }

  importBackup(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload =
      (e: any) => {

        const backup =
          JSON.parse(
            e.target.result
          );

        Object.keys(
          backup
        ).forEach(key => {

          localStorage.setItem(
            key,
            backup[key]
          );

        });

        alert(
          'Backup restaurado correctamente. Recargue la aplicación.'
        );

      };

    reader.readAsText(
      file
    );

  }

}