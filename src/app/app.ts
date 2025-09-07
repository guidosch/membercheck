import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstLastnameForm } from "./first-lastname-form/first-lastname-form";
import { VerificationCode } from './verification-code/verification-code';
import { MatCardModule } from '@angular/material/card';
import {FooterComponent} from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FirstLastnameForm, MatCardModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('membercheck');
}
