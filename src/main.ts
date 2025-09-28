import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {MatSnackBar} from '@angular/material/snack-bar';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
