import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { GalaxyBackgroundComponent } from "./components/galaxy-background/galaxy-background.component";
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from "./components/about/about.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { ContactComponent } from "./components/contact/contact.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    GalaxyBackgroundComponent, 
    HeroComponent, 
    AboutComponent, 
    ExperienceComponent, 
    ProjectsComponent, 
    SkillsComponent, 
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentSection = 'hero';
  isLightningActive = false;
  private lightningTimeout: any;

  constructor(private smoothScroll: SmoothScrollService) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.detectCurrentSection();
  }

  detectCurrentSection() {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.currentSection = section;
          break;
        }
      }
    }
  }

  triggerLightning() {
    console.log('Lightning triggered!');
    
    if (this.lightningTimeout) {
      clearTimeout(this.lightningTimeout);
    }
    
    this.isLightningActive = false;
    
    setTimeout(() => {
      this.isLightningActive = true;
      console.log('Lightning animation started');
      
      this.lightningTimeout = setTimeout(() => {
        this.isLightningActive = false;
        console.log('Lightning animation ended');
      }, 800);
    }, 10);
  }
}