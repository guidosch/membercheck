import { Component, input } from '@angular/core';
import { Member } from '../member';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-membership-proof',
  imports: [DatePipe],
  templateUrl: './membership-proof.html',
  styleUrl: './membership-proof.css'
})
export class MembershipProof {

  today: Date = new Date();
  member = input.required<Member>();

}
