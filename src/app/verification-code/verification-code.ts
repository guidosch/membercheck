import { Component, input, output, signal } from '@angular/core';
import { CodeInputModule } from 'angular-code-input';
import { CloudFunctions } from '../cloud-functions';
import { Member } from '../member';
import { MembershipProof } from "../membership-proof/membership-proof";
import { J } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-verification-code',
  imports: [CodeInputModule, MembershipProof],
  templateUrl: './verification-code.html',
  styleUrl: './verification-code.css'
})
export class VerificationCode {

  member = input.required<Member>();
  //todo: try only wiht inputs no signal needed here
  verifiedMemberFromBackend = signal<Member>(new Member("",""));
  
  constructor(private backendService: CloudFunctions) { }

  onCodeCompleted(code: string) {
    console.log('Code completed: ', typeof (code), code);
    this.backendService.verifyMember(this.member()).subscribe({
      next: (response) => {
        console.log('Member verified', JSON.stringify(response));
        this.verifiedMemberFromBackend.update(() => response);

      },
      error: (err) => {
        console.error('Error occurred while verifying member', err);
      }
    });
  }

}
