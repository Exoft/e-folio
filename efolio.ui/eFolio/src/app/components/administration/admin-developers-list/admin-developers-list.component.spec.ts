import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDevelopersListComponent } from './admin-developers-list.component';

describe('AdminDevelopersListComponent', () => {
  let component: AdminDevelopersListComponent;
  let fixture: ComponentFixture<AdminDevelopersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDevelopersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDevelopersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
