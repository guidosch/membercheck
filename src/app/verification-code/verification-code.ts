import { Component, inject, input, output, signal } from '@angular/core';
import { CodeInputModule } from 'angular-code-input';
import { CloudFunctions } from '../cloud-functions';
import { Member } from '../member';
import { MembershipProof } from "../membership-proof/membership-proof";
import { J } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBar = inject(MatSnackBar);
  
  constructor(private backendService: CloudFunctions) { }

  onCodeCompleted(code: string) {
    console.log('Code completed: ', code);
    this.backendService.verifyMember(this.member()).subscribe({
      next: (response) => {
        //console.log('Member verified', JSON.stringify(response));
        this.verifiedMemberFromBackend.update(() => response);

      },
      error: (err) => {
        if (err.status === 404) {
          console.warn('Invalid verification code', err);
          this.snackBar.open("Ungültiger Verifikationscode.", "Schliessen");
        } else if (err.status >= 500) {
          console.error('Error occurred while verifying member', err);
          this.snackBar.open("Serverfehler. Bitte versuche es später erneut.", "Schliessen");
        }
        console.error('Error occurred while verifying member', err);
      }
    });
  }

}
