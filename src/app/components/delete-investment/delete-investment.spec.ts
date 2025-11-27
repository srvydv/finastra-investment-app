import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInvestment } from './delete-investment';

describe('DeleteInvestment', () => {
  let component: DeleteInvestment;
  let fixture: ComponentFixture<DeleteInvestment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteInvestment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInvestment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
