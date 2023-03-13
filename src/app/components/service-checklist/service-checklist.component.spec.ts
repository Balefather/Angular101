import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChecklistComponent } from './service-checklist.component';

describe('ServiceChecklistComponent', () => {
  let component: ServiceChecklistComponent;
  let fixture: ComponentFixture<ServiceChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
