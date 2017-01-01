import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import {GameComponent} from "./game.component";
import {CodeCardComponent} from "./code-card.component";
import {Widget1Component} from "./widget1.component";

@NgModule({

    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        GameComponent,
        CodeCardComponent,
        Widget1Component
    ],
    entryComponents: [Widget1Component],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

