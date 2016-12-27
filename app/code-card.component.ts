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
<span class="name">{{name}}</span>
<span class="name turn">{{name}}</span></div>

<div class="map" *ngIf="is_map"
[ngClass]="{'red': myColorNr==0, 'blue': myColorNr==1, 'grey': myColorNr==2, 'black': myColorNr==3}"
>
</div>
`,
    styles: [`
:host {
}
.card {
border-radius: 4px;
background: white;
font-size: 19px;
font-weight: 900;
 display: inline-block;
 position: relative;
 
 width: 150px;
 height: 80px;
 
 margin: 0 4px 4px 0;
 text-align: center;
 border: 1px solid grey;
}
.map {
border-radius: 2px;
font-size: 2px;
 display: inline-block;
 width: 20px;
 height: 14px;
 margin: 0 6px 3px 0;
 border: 1px solid grey;
}
.name {
position: relative;
top: 10px;
}
.turn {
position: absolute;
transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
top: 46px;
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