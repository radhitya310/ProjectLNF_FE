import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  status!: string;
  reason!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}