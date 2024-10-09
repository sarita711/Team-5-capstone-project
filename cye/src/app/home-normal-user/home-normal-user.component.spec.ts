import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNormalUserComponent } from './home-normal-user.component';

describe('HomeNormalUserComponent', () => {
  let component: HomeNormalUserComponent;
  let fixture: ComponentFixture<HomeNormalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeNormalUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNormalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
