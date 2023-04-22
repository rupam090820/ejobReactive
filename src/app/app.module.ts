import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// For Rective Form we must import ReactiveFormsModule :
import { ReactiveFormsModule } from '@angular/forms';
import { NewFormComponent } from './new-form/new-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // Declare here.......
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
