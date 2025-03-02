import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-modal',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.css'
})
export class DialogModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    console.log(data.message)
  }
}
