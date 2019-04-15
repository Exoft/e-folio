import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeveloperDialogComponent } from './add-developer-dialog.component';

describe('AddDialogComponent', () => {
  let component: AddDeveloperDialogComponent;
  let fixture: ComponentFixture<AddDeveloperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeveloperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeveloperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
