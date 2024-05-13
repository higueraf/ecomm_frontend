import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, isSuccess: boolean) {
    const panelClass = isSuccess ? ['snackbar-success'] : ['snackbar-error'];
    this._snackBar.open(message, action, {
      panelClass: panelClass
    });
  }
}
