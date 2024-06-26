import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<TokenComponent>, private clipboard: Clipboard) { }

  // closes dialog and copies token to clipboard
  closeAndCopy(): void {
    this.clipboard.copy(this.data);
    this.dialogRef.close();
  }
}
