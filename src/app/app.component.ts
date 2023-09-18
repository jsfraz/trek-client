import { Component, OnInit, Renderer2, ElementRef, Inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trek-client';

  isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // init flowbite
    initFlowbite();
  }

  toggleDarkMode() {
    // Toggle the "dark" class on the body element
    if (this.isDarkMode) {
      this.renderer.removeClass(this.document.body, 'dark');
    } else {
      this.renderer.addClass(this.document.body, 'dark');
    }
    this.isDarkMode = !this.isDarkMode; // Toggle the mode
  }
}
