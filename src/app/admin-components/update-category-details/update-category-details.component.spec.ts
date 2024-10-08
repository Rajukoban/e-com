import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryDetailsComponent } from './update-category-details.component';

describe('UpdateCategoryDetailsComponent', () => {
  let component: UpdateCategoryDetailsComponent;
  let fixture: ComponentFixture<UpdateCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
