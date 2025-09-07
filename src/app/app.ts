import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstLastnameForm } from "./first-lastname-form/first-lastname-form";
import { VerificationCode } from './verification-code/verification-code';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FirstLastnameForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('membercheck');
}
