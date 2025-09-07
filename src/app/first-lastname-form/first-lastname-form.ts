import { Component, model, ModelSignal, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../member';
import { CloudFunctions } from '../cloud-functions';
import { VerificationCode } from '../verification-code/verification-code';

@Component({
  selector: 'app-first-lastname-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, VerificationCode],
  templateUrl: './first-lastname-form.html',
  styleUrl: './first-lastname-form.css'
})
export class FirstLastnameForm {

  constructor(private backendService: CloudFunctions) { }

  member = signal<Member>(new Member("",""));
  hideForm: boolean = false;

  meberForm = new FormGroup({
    firstName: new FormControl(this.member().firstName, [Validators.required]),
    lastName: new FormControl(this.member().lastName, [Validators.required,]),
  });


  onFormSubmit(): void {
    this.hideForm = true;
    console.log('Form Value', JSON.stringify(this.meberForm.value));
    this.backendService.searchMember(this.meberForm.value.firstName!, this.meberForm.value.lastName!).subscribe({
      next: (member) => {
        console.log('Member found', member);
        this.member.update(() => member);
      },
      error: (err) => {
        console.error('Error occurred while searching member', err);
      }
    });

  }
}
