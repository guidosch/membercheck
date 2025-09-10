import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, model, ModelSignal, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../member';
import { CloudFunctions } from '../cloud-functions';
import { VerificationCode } from '../verification-code/verification-code';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Snackbar } from '../snackbar/snackbar';


@Component({
  selector: 'app-first-lastname-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, VerificationCode],
  templateUrl: './first-lastname-form.html',
  styleUrl: './first-lastname-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLastnameForm {

  constructor(private backendService: CloudFunctions, private ref: ChangeDetectorRef) { }

  member = signal<Member>(new Member("", ""));
  hideForm: boolean = false;
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
        console.log('Member found', member);
        this.member.update(() => member);
        this.hideForm = true;
        this.ref.markForCheck(); // trigger change detection manually due to async var update hideForm. The change detection was already run when the async var was updated.
      },
      error: (err) => {
        if (err.status === 404) {
          this.hideForm = true;
        } else if (err.status >= 500) {
          console.error('Error occurred while searching member', err);
          this.openSnackBar();
          this.hideForm = false;
        }
        this.ref.markForCheck();
      }
      
    });

  }

  openSnackBar() {
    this.snackBar.openFromComponent(Snackbar, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
