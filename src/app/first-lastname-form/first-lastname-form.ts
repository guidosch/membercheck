import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../member';
import { CloudFunctions } from '../cloud-functions';
import { VerificationCode } from '../verification-code/verification-code';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-first-lastname-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, VerificationCode],
  templateUrl: './first-lastname-form.html',
  styleUrl: './first-lastname-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLastnameForm {

  constructor(private backendService: CloudFunctions) { }

  // Using signals for state management. The hideFrom would not work with a simple boolean as the change detection strategy is OnPush.
  // The update of the signal triggers change detection.
  member = signal<Member>(new Member("", ""));
  hideForm = signal<boolean>(false);
  private snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  meberForm = new FormGroup({
    firstName: new FormControl(this.member().firstName, [Validators.required]),
    lastName: new FormControl(this.member().lastName, [Validators.required,]),
  });


  onFormSubmit(): void {
    console.log('Form Value', JSON.stringify(this.meberForm.value));
    this.backendService.searchMember(this.meberForm.value.firstName!.trim(), this.meberForm.value.lastName!.trim()).subscribe({
      next: (member) => {
        //console.log('Member found', member);
        this.member.update(() => member);
        this.hideForm.update(() => true);
      },
      error: (err) => {
        if (err.status === 404) {
          this.hideForm.update(() => true);
        } else if (err.status === 429) {
          console.warn('Rate limit exceeded', err);
          this.snackBar.open("Zu viele Anfragen. Bitte morgen nochmals versuchen.", "Schliessen");
        }
        else if (err.status >= 500) {
          console.error('Error occurred while searching member', err);
          this.snackBar.open("Serverfehler. Bitte versuche es später erneut.", "Schliessen");
        }
      }
      
    });

  }

}
