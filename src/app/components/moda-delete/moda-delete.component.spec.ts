import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaDeleteComponent } from './moda-delete.component';

describe('ModaDeleteComponent', () => {
  let component: ModaDeleteComponent;
  let fixture: ComponentFixture<ModaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModaDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
