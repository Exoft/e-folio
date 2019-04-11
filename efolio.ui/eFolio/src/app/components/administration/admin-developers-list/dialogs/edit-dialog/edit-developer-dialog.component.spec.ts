import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeveloperDialogComponent } from './edit-developer-dialog.component';

describe('EditDeveloperDialogComponent', () => {
  let component: EditDeveloperDialogComponent;
  let fixture: ComponentFixture<EditDeveloperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeveloperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeveloperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
