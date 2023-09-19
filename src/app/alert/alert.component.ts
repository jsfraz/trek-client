import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  // https://www.nerd.vision/post/how-to-pass-data-to-a-matdialog, https://material.angular.io/components/dialog/examples
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AlertComponent>) { }

  ngOnInit(): void {
      console.error(this.data);
  }

  formatErrorStringAsPrettyJSON(any: any): string {
    return JSON.stringify(any, null, 2);
  }
}