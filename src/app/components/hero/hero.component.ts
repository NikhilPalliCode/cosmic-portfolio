import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Output() downloadResume = new EventEmitter<void>(); // Emit void, not MouseEvent

  constructor(private smoothScroll: SmoothScrollService) {}

  scrollToContact() {
    this.smoothScroll.scrollToElement('contact');
  }

  onDownloadResume() {
    console.log('Download button clicked - emitting event');
    this.downloadResume.emit(); // Emit without parameters
    
    // Add a small delay to ensure lightning animation is visible
    setTimeout(() => {
      this.triggerDownload();
    }, 300);
  }

  private triggerDownload() {
    try {
      const link = document.createElement('a');
      link.href = 'assets/Nikhil_Palli_Java_Developer_Resume.pdf';
      link.download = 'Nikhil_Palli_Resume.pdf';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download triggered successfully');
    } catch (error) {
      console.error('Download failed:', error);
      window.open('assets/Nikhil_Palli_Java_Developer_Resume.pdf', '_blank');
    }
  }
}