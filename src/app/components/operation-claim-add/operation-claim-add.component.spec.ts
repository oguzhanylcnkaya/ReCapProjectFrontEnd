import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationClaimAddComponent } from './operation-claim-add.component';

describe('OperationClaimAddComponent', () => {
  let component: OperationClaimAddComponent;
  let fixture: ComponentFixture<OperationClaimAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationClaimAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationClaimAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
