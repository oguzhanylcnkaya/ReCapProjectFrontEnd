import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationClaimUpdateComponent } from './operation-claim-update.component';

describe('OperationClaimUpdateComponent', () => {
  let component: OperationClaimUpdateComponent;
  let fixture: ComponentFixture<OperationClaimUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationClaimUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationClaimUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
