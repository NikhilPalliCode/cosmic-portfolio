import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  currentSection = 'hero';

  sections = [
    { id: 'hero', name: 'Home', icon: 'fas fa-home' },
    { id: 'about', name: 'About', icon: 'fas fa-user-astronaut' },
    { id: 'experience', name: 'Experience', icon: 'fas fa-rocket' },
    { id: 'projects', name: 'Projects', icon: 'fas fa-code' },
    { id: 'skills', name: 'Skills', icon: 'fas fa-cogs' },
    { id: 'contact', name: 'Contact', icon: 'fas fa-comments' }
  ];

  constructor(private smoothScroll: SmoothScrollService) {}

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.detectCurrentSection();
  }

  detectCurrentSection() {
    const scrollPosition = window.scrollY + 100;

    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.currentSection = section.id;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    this.smoothScroll.scrollToElement(sectionId);
    this.currentSection = sectionId;
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/Nikhil_Palli_Java_Developer_Resume.pdf';
    link.download = 'Nikhil_Palli_Resume.pdf';
    link.click();
  }
}