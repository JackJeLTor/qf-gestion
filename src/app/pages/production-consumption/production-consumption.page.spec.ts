import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionConsumptionPage } from './production-consumption.page';

describe('ProductionConsumptionPage', () => {
  let component: ProductionConsumptionPage;
  let fixture: ComponentFixture<ProductionConsumptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionConsumptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
