import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasetestComponent } from './databasetest.component';

describe('DatabasetestComponent', () => {
  let component: DatabasetestComponent;
  let fixture: ComponentFixture<DatabasetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasetestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabasetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
