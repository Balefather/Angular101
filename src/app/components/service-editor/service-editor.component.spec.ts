import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartEditorComponent } from './service-editor.component';

describe('PartEditorComponent', () => {
  let component: PartEditorComponent;
  let fixture: ComponentFixture<PartEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
