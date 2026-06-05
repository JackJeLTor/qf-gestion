import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboratoriesPage } from './laboratories.page';

describe('LaboratoriesPage', () => {
  let component: LaboratoriesPage;
  let fixture: ComponentFixture<LaboratoriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
