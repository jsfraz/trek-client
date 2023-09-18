import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trek-client';

  // dark/light mode
  isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // brightness mode
    this.getBrightnessMode();
    // init flowbite
    initFlowbite();
  }

  // get brightness mode
  getBrightnessMode(): void {
    var mode: string = localStorage.getItem('brightness_mode') ?? 'dark';
    if (mode == 'dark') {
      // set dark mode
      this.isDarkMode = true;
      localStorage.setItem('brightness_mode', mode);
      this.renderer.addClass(this.document.body, mode);
      this.renderer.setStyle(this.document.documentElement, 'background-color', '#1f2937');
    } else {
      // set light mode
      this.isDarkMode = false;
      localStorage.setItem('brightness_mode', mode);
    }
  }

  // toggle dark mode
  toggleDarkMode(): void {
    if (this.isDarkMode) {
      // set light light
      localStorage.setItem('brightness_mode', 'light');
      this.renderer.removeClass(this.document.body, 'dark');
      this.renderer.setStyle(this.document.documentElement, 'background-color', '#ffffff');
    } else {
      // set dark mode
      localStorage.setItem('brightness_mode', 'dark');
      this.renderer.addClass(this.document.body, 'dark');
      this.renderer.setStyle(this.document.documentElement, 'background-color', '#1f2937');
    }
    this.isDarkMode = !this.isDarkMode;
  }
}
