import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionMaterialsPage } from './production-materials.page';

describe('ProductionMaterialsPage', () => {
  let component: ProductionMaterialsPage;
  let fixture: ComponentFixture<ProductionMaterialsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionMaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
