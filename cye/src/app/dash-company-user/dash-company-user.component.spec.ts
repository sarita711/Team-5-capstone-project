import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCompanyUserComponent } from './dash-company-user.component';

describe('DashCompanyUserComponent', () => {
  let component: DashCompanyUserComponent;
  let fixture: ComponentFixture<DashCompanyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashCompanyUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashCompanyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


  

