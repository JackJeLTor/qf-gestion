import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessHistoryPage } from './access-history.page';

describe('AccessHistoryPage', () => {
  let component: AccessHistoryPage;
  let fixture: ComponentFixture<AccessHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
