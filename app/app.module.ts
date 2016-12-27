import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import {GameComponent} from "./game.component";
import {CodeCardComponent} from "./code-card.component";

@NgModule({

    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        GameComponent,
        CodeCardComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

