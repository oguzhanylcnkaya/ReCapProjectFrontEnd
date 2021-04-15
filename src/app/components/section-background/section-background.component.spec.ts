import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBackgroundComponent } from './section-background.component';

describe('SectionBackgroundComponent', () => {
  let component: SectionBackgroundComponent;
  let fixture: ComponentFixture<SectionBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
