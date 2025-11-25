import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMyInvestment } from './find-my-investment';

describe('FindMyInvestment', () => {
  let component: FindMyInvestment;
  let fixture: ComponentFixture<FindMyInvestment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindMyInvestment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindMyInvestment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
