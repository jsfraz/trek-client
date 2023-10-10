import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TokenComponent>, private clipboard: Clipboard) { }

  ngOnInit(): void {
    console.info(this.data);
  }

  // closes dialog and copies token to clipboard
  closeAndCopy(): void {
    this.clipboard.copy(this.data);
    this.dialogRef.close();
  }
}
