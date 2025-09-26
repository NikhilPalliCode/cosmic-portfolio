import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  projectTech: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;
  
  currentIndex = 0;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  gap = 30;

  projects: Project[] = [
    {
      title: "NASA Telegram Bot",
      description: "Spring Boot application serving NASA's Astronomy Picture of the Day with real-time user interactions and 99% uptime. Integrated with Telegram Bot API and NASA APOD API.",
      technologies: ["Spring Boot 3.5.5", "Java 17", "Telegram Bot API", "NASA APOD API", "Maven", "Railway"],
      link: "#",
      github: "https://github.com/NikhilPalliCode/nasa-telegram-bot",
      projectTech: "Java Spring Boot"
    },
    {
      title: "Slate CRM Integration",
      description: "Java-based integrations connecting Slate CRM with university enterprise systems, ensuring seamless data flow and high data synchronization for student admissions processes.",
      technologies: ["Java", "REST APIs", "MySQL", "PostgreSQL", "ETL Processes", "JavaScript"],
      link: "#",
      github: "#",
      projectTech: "Database Administration"
    },
    {
      title: "Healthcare Data Processing",
      description: "HIPAA-compliant Java applications for healthcare sector using Spring Boot, Apache Camel, and enterprise design patterns for medical instrument tracking systems.",
      technologies: ["Spring Boot", "Apache Camel", "JMS", "HIPAA Compliance", "Spring Batch", "Hibernate"],
      link: "#",
      github: "#",
      projectTech: "Java Spring MVC"
    },
    {
      title: "Snake Game with JavaScript",
      description: "Classic Snake game built with vanilla JavaScript, HTML5 Canvas, and modern CSS with responsive design and persistent high score storage.",
      technologies: ["JavaScript ES6+", "HTML5 Canvas", "CSS3", "Vercel", "Local Storage API"],
      link: "https://snake-game-qaxu42ru8-nikhil-pallis-projects.vercel.app/",
      github: "https://github.com/NikhilPalliCode/snake-game",
      projectTech: "JavaScript"
    },
    {
      title: "Christian Museum Tours Reservation System",
      description: "Built intelligent Google Forms integration with custom JavaScript automation that dynamically routes reservation requests to appropriate local tour guides based on geographic location and availability. Implemented sophisticated Google Calendar API integration enabling automatic scheduling, real-time availability checking, and synchronized booking management across multiple independent tour operators.",
      technologies: ["JavaScript", "Google Forms API", "Google Calendar API", "Automation Scripting", "Geographic Routing"],
      link: "https://christianmuseumtours.com/",
      github: "",
      projectTech: "JavaScript"
    },
    {
      title: "K-Nearest Neighbors (KNN) Algorithm for Breast Cancer Detection",
      description: "Developed sophisticated K-Nearest Neighbors (KNN) classification model achieving exceptional accuracy in distinguishing between malignant and benign breast tumors using Wisconsin diagnostic dataset containing comprehensive medical features. Performed comprehensive data preprocessing including feature scaling, normalization, and dimensionality analysis, coupled with rigorous hyperparameter optimization using cross-validation techniques to identify optimal model configuration.",
      technologies: ["Python", "K-Nearest Neighbors", "Scikit-learn", "Data Preprocessing", "Cross-Validation", "Hyperparameter Optimization", "Medical Data Analysis"],
      link: "#",
      github: "https://github.com/NikhilPalliCode/breast-cancer-knn-",
      projectTech: "Python Data Science"
    },
    {
      title: "Reverse Polish Notation Calculator",
      description: "Built comprehensive interactive web-based calculator application that efficiently evaluates complex mathematical expressions using Reverse Polish Notation with stack-based algorithmic approach. Implemented robust core logic in JavaScript with comprehensive input validation, error handling, and user-friendly error messaging system.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Stack Data Structure", "Algorithm Implementation", "Input Validation", "Error Handling"],
      link: "https://nikhilpallicode.github.io/rpnCalculator/",
      github: "https://github.com/NikhilPalliCode/rpnCalculator/tree/main",
      projectTech: "JavaScript"
    },
    {
      title: "Quiz Game Application",
      description: "Interactive quiz game built with Angular CLI featuring dynamic question rendering, score tracking, and responsive user interface. Includes comprehensive testing suite with unit tests via Karma and end-to-end testing capabilities.",
      technologies: ["Angular 17", "TypeScript", "HTML5", "SCSS", "CSS3", "Karma", "Angular CLI", "Component Architecture"],
      link: "#",
      github: "https://github.com/NikhilPalliCode/quiz-app",
      projectTech: "Angular"
    }
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateButtonVisibility();
    }, 100);
  }

  @HostListener('window:resize')
  onResize() {
    setTimeout(() => {
      this.updateButtonVisibility();
    }, 100);
  }

  getCardWidth(): number {
    if (window.innerWidth < 768) {
      return this.scroller.nativeElement.offsetWidth - 40;
    } else if (window.innerWidth < 1024) {
      return 350;
    } else {
      return 400;
    }
  }

  scrollLeftAction() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToCurrent();
      this.updateButtonVisibility();
    }
  }

  scrollRightAction() {
    if (this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
      this.scrollToCurrent();
      this.updateButtonVisibility();
    }
  }

  goToProject(index: number) {
    this.currentIndex = index;
    this.scrollToCurrent();
    this.updateButtonVisibility();
  }

  scrollToCurrent() {
    const cardWidth = this.getCardWidth();
    const scrollPosition = this.currentIndex * (cardWidth + this.gap);
    
    this.scrollHorizontally(
      this.scroller.nativeElement, 
      scrollPosition,
      300
    );
  }

  scrollHorizontally(element: HTMLElement, target: number, duration: number) {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const ease = (t: number) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      
      element.scrollLeft = start + change * ease(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }

  updateButtonVisibility() {
    // Button visibility is handled by template bindings
  }

  onScroll() {
    this.updateCurrentIndex();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.scroller.nativeElement.offsetLeft;
    this.scrollLeft = this.scroller.nativeElement.scrollLeft;
    this.scroller.nativeElement.style.cursor = 'grabbing';
    this.scroller.nativeElement.style.scrollBehavior = 'auto';
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.scroller.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.scroller.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  onMouseUp() {
    this.isDragging = false;
    this.scroller.nativeElement.style.cursor = 'grab';
    this.scroller.nativeElement.style.scrollBehavior = 'smooth';
    this.updateCurrentIndex();
    this.updateButtonVisibility();
  }

  onTouchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].pageX - this.scroller.nativeElement.offsetLeft;
    this.scrollLeft = this.scroller.nativeElement.scrollLeft;
    this.scroller.nativeElement.style.scrollBehavior = 'auto';
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const x = event.touches[0].pageX - this.scroller.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.scroller.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  onTouchEnd() {
    this.isDragging = false;
    this.scroller.nativeElement.style.scrollBehavior = 'smooth';
    this.updateCurrentIndex();
    this.updateButtonVisibility();
  }

  updateCurrentIndex() {
    const scrollPos = this.scroller.nativeElement.scrollLeft;
    const cardWidth = this.getCardWidth();
    const totalWidth = cardWidth + this.gap;
    
    this.currentIndex = Math.round(scrollPos / totalWidth);
    this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.projects.length - 1));
  }
}