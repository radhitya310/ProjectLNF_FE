import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavbarLayoutComponent } from './main-navbar-layout.component';

describe('MainNavbarLayoutComponent', () => {
  let component: MainNavbarLayoutComponent;
  let fixture: ComponentFixture<MainNavbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavbarLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
