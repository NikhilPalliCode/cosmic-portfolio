import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galaxy-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galaxy-background.component.html',
  styleUrls: ['./galaxy-background.component.css']
})
export class GalaxyBackgroundComponent implements OnInit {
  @Input() currentSection: string = 'hero'; // Add this input property

  sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
  
  ngOnInit() {
    this.createStars();
  }

  createStars() {
    // Stars are created via CSS
  }

  getBeamTransform(): string {
    const index = this.sections.indexOf(this.currentSection);
    const position = (index / (this.sections.length - 1)) * 80 + 10;
    return `translateY(${position}vh)`;
  }
}