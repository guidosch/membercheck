import { Component, input } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-membership-proof',
  imports: [],
  templateUrl: './membership-proof.html',
  styleUrl: './membership-proof.css'
})
export class MembershipProof {

  member = input.required<Member>();

}
