import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-book-del-confirm-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-del-confirm-dialog.component.html',
  styleUrl: './book-del-confirm-dialog.component.css'
})
export class BookDelConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<BookDelConfirmDialogComponent>);
}
