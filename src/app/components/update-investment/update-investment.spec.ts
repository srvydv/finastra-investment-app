import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestment } from './update-investment';

describe('UpdateInvestment', () => {
  let component: UpdateInvestment;
  let fixture: ComponentFixture<UpdateInvestment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInvestment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInvestment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
