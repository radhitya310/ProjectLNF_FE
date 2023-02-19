import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly meta: Meta
  ) { }

  ngOnInit(): void {
    this.meta.removeTag('name="viewport"');
    this.meta.addTag({ name: 'viewport', content: 'min-width=900, initial-scale=1, shrink-to-fit=no' })
  }

}