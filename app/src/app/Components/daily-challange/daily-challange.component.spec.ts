import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyChallangeComponent } from './daily-challange.component';

describe('DailyChallangeComponent', () => {
  let component: DailyChallangeComponent;
  let fixture: ComponentFixture<DailyChallangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyChallangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyChallangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
