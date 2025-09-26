import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxyBackgroundComponent } from './galaxy-background.component';

describe('GalaxyBackgroundComponent', () => {
  let component: GalaxyBackgroundComponent;
  let fixture: ComponentFixture<GalaxyBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalaxyBackgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalaxyBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
