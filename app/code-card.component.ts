import {
    Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, ChangeDetectorRef,
    ViewChild
} from "@angular/core";
declare var $:any;

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
    <span class="posRel borderLine elem1" #refElem [ngClass]="{'smaller':makeSmaller, 'cheat': myColorNr==extraInfo, 'cheat2': myColorNr==3}" >{{name}}</span>
    <span class="posRel turn" [ngClass]="{'smaller':makeSmaller}" >{{name}}</span>
    <span class="info" style="display: none"><ng-content></ng-content>{{widthOfName}}</span>
</div>

<div class="map" *ngIf="is_map"
    [ngClass]="{'openedInMap':is_mapOpen, 
    'red': myColorNr==0, 'blue': myColorNr==1, 'grey': myColorNr==2, 'black': myColorNr==3}"
    >
</div>
`,
    styles: [`
:host {
}
.card {
 display: inline-block;
 position: relative;
 
 width: 150px;
 height: 80px;
 
 margin: 0 4px 4px 0;
 text-align: center;
 
 border: 1px solid grey;
 border-radius: 4px;
 background: white;
 font-size: 19px;
 font-weight: 900;
}
.smaller{
font-size: 16px;
}
.map {
border-radius: 2px;
font-size: 2px;
 display: inline-block;
 width: 21px;
 height: 12px;
 margin: 0 5px 5px 0;
 border: 1px solid grey;
}
.openedInMap {
opacity: 0.6;
}
.info {
color: red;position: absolute;top:0;left:0;font-size: 16px;
}
.posRel {
position: relative;
top: 10px;
}
.turn {
position: absolute;
transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
top: 52px;
left: 0;
width: 100%;
color: #444;
}
.borderLine {
padding-bottom: 10px;
border-bottom: 1px solid lightgray;
}
.red > .cheat {
border-bottom: 1px solid lightgray;
padding-right: 0px;
padding-left: 0px;
}
.cheat {
//border-bottom: 1px dotted #d3d3d3;
padding-right: 2px;
padding-left: 2px;
/*
background: lightgoldenrodyellow;
 */
}
.cheat2 {
//border-bottom: 1px dotted #d3d3d3;
}
.black > .cheat2 {
border-bottom: 1px solid lightgray;
}
.red {
background: orangered;
}
.blue {
background: dodgerblue;
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
export class CodeCardComponent implements AfterViewInit {
    @Input() name:string;
    @Input() myId:number;
    @Input() myColorNr:number;
    @Input() is_map:boolean;
    @Input() extraInfo:number;

    @Output() sendColorNr:EventEmitter<number> = new EventEmitter();

    @ViewChild('refElem') refToElement;

    isClicked:boolean = false;
    is_mapOpen:boolean;
    widthOfName:number;
    makeSmaller:boolean;
    myFontSize:number = 19;
    showCardColor:boolean = false;

    //<input #keywordInput type="text"/>.
    // The best way is to do @ViewChild('keywordInput') keywordInput; and then
    // this.keywordInput.nativeElement.focus();



    constructor(private _elRef: ElementRef, private _cdRef:ChangeDetectorRef) { }

    ngAfterViewInit(): void {
//        this.widthOfName = $(this._elRef.nativeElement).find('.elem1').innerWidth(); //Math.floor(Math.random()*100);
        //this.widthOfName = this.refToElement.nativeElement.width;
        if (this.refToElement){
            this.widthOfName = this.refToElement.nativeElement.offsetWidth;
        }
        if (this.refToElement && this.refToElement.nativeElement.offsetWidth > 140) {
            // this.refToElement.nativeElement.
            this.makeSmaller = true;
            //this.myFontSize = 10; // [ngStyle]="{'font-size': myFontSize}"
        }

        // avoid: Expression has changed after it was checked
        this._cdRef.detectChanges();
    }

    onShowColor() {
        this.showCardColor = true;
        if (!this.isClicked) {
            this.sendColorNr.emit(this.myId);
            this.isClicked = true;
        }
    }
}