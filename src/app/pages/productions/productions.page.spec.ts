import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionsPage } from './productions.page';

describe('ProductionsPage', () => {
  let component: ProductionsPage;
  let fixture: ComponentFixture<ProductionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
