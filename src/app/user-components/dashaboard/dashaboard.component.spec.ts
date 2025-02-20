import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashaboardComponent } from './dashaboard.component';

describe('DashaboardComponent', () => {
  let component: DashaboardComponent;
  let fixture: ComponentFixture<DashaboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashaboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashaboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
