import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipProof } from './membership-proof';

describe('MembershipProof', () => {
  let component: MembershipProof;
  let fixture: ComponentFixture<MembershipProof>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipProof]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipProof);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
