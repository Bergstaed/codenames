import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component ({
    selector: 'code-card',
    template: `
<div class="card" *ngIf="!is_map"
(click)="onShowColor()"
[ngClass]="{
    'red': showCardColor && myColorNr==0,
    'blue': showCardColor && myColorNr==1,
    'grey': showCardColor && myColorNr==2,
    'black': showCardColor && myColorNr==3}"
>
<span>{{name}}</span>
<span class="turn">{{name}}</span></div>

<div class="map" *ngIf="is_map"
[ngClass]="{'red': myColorNr==0, 'blue': myColorNr==1, 'grey': myColorNr==2, 'black': myColorNr==3}"
>
</div>
`,
    styles: [`
:host {
font-size: 20px;
font-weight: 900;
}
.card {
 display: inline-block;
 position: relative;
 width: 144px;
 height: 60px;
 margin: 0 10px 20px 0;
 text-align: center;
 border: 1px solid grey;
}
.map {
 display: inline-block;
 width: 12px;
 height: 12px;
 margin: 1px;
 border: 1px solid grey;
}
.turn {
position: absolute;
transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
top: 30px;
left: 10px;
width: 100%;
color: grey;
}
.red {
background: red;
}
.blue {
background: blue;
color: white;
}
.grey {
background: lightgray;
}
.black {
background: black;
color: white;
}
`]
})
export class CodeCardComponent{
@Input() name:string;
@Input() myColorNr:number;
@Input() is_map:boolean;
@Output() sendColorNr:EventEmitter<number> = new EventEmitter();
isClicked:boolean = false;

    showCardColor:boolean = false;

    onShowColor() {
        this.showCardColor = true;
        if (!this.isClicked) {
            this.sendColorNr.emit(this.myColorNr);
            this.isClicked = true;
        }
    }
}