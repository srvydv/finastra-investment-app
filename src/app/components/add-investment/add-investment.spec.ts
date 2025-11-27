import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestment } from './add-investment';

describe('AddInvestment', () => {
  let component: AddInvestment;
  let fixture: ComponentFixture<AddInvestment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
