import { M } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css'
})
export class Snackbar {
  snackBarRef = inject(MatSnackBarRef);
}
