import {Component, OnInit, ViewChildren, QueryList} from "@angular/core";
import {WordsService} from "./words.service";
import {CodeCardComponent} from "./code-card.component";

@Component ({
    selector: 'game',
    template: `
    <div *ngIf="isButtonbarOpen" class="buttonRow fixed">
        <button *ngFor="let btn of btns; let j=index" (click)="playGame(j)">{{j+1}}</button>
        <button style="margin-left: 5px" (click)="isButtonbarOpen=false">x</button>
    </div>
<div class="wrapper">
<div class="counter">
<div>
    <button (click)="changeGameNr(-1)">-</button>
    <span class="gameNr" (click)="isButtonbarOpen = true">Spiel Nr: {{numberOfGame + 1}}</span>
    <button (click)="changeGameNr(1)">+</button>
</div>
<div class="group-red" [ngClass]="{'backgr': pointsRed>=9}">{{pointsRed}}/9</div>
<div class="group-blue" [ngClass]="{'backgr': pointsBlue>=9}">{{pointsBlue}}/9</div>

</div>
<div class="wrapper-cards">
<code-card *ngFor="let item of list; let i=index"
[name]="item"
[myColorNr]="colorList[i]"
[is_map]="false"
[myId]="i"
(sendColorNr)="onSendColorNr($event)"
 >

</code-card>
</div>
    <div class="wrapper-map">
        <code-card *ngFor="let item of list; let i=index"
        [myColorNr]="colorList[i]"
        [is_map]="true"
        [myId]="i"
        >
        
        </code-card>
    </div>

</div>
<div>{{duplicates}}</div>
`,
    styles: [`

.fixed {
position: fixed;
}
.gameNr {
margin:4px;
}
.wrapper-cards {
font-size: 28px;
font-weight: 600;
    margin: 0 auto;
 width: 820px;
 height: 450px;
 border: 1px solid transparent;
}

.wrapper-map {
font-size: 2px;
font-weight: 100;
margin: 0 auto;
margin-top: 90px;
 width: 150px;
 height: 110px;
 border: 1px solid transparent;
}

.counter {
 position: relative;
}
.counter > div {
 padding: 10px;
}
.group-red {
font-size: 30px;
font-weight: 900;
position: absolute;
top:40px;
left: 10px;
color: orangered;
}
.group-blue {
font-size: 30px;
font-weight: 900;
position: absolute;
top:40px;
right: 10px;
color: dodgerblue;

}
.backgr {
background: black;
}
.buttonRow {
display: inline-block;
margin-top: 25px;
background: white;
border: 2px solid gray;
padding: 20px;
z-index: 200;
}
.buttonRow button {
font-size: 20px;
 padding: 4px 2px;
 width: 35px;
 margin-right: 16px;
 margin-bottom: 15px;
}
`],
    providers: [WordsService],
})
export class GameComponent implements OnInit {
    colorList:number[];
    pointsRed:number;
    pointsBlue:number;
    btns:number[] = [0,1,2];
    list:string[];
    duplicates:string[];
    numberOfGame:number = 0;
    isButtonbarOpen:boolean;

    @ViewChildren(CodeCardComponent) codeCardCompList : QueryList<CodeCardComponent>;


    constructor(private worsdservice:WordsService ) {

    }
    playGame(nr:number) {
        this.numberOfGame = nr;
        this.ngOnInit();
        this.isButtonbarOpen = false;
    }

    changeGameNr (addMe:number) {
        let newNumber:number = this.numberOfGame + addMe;
        if (newNumber >= 0 && newNumber < this.btns.length) {
            this.numberOfGame += addMe;
            this.ngOnInit();
        }

    }
    ngOnInit(): void {
        let anzBtns:number;
        this.isButtonbarOpen = false;
        this.colorList = this.getRandomList();
        this.pointsBlue = 0;
        this.pointsRed = 0;
        this.worsdservice.getWords(this.numberOfGame).then(list => this.list = list );
        this.worsdservice.getNumberOfGames().then(n => this.btns = n);

        this.worsdservice.findDuplicates().then(n => this.duplicates = n);

        console.log("Duplicate: " + this.duplicates);
    }

    onSendColorNr(id:number) {
        let colorNr:number = this.colorList[id];

        switch (colorNr) {
            case 0:
                this.pointsRed++;
            break;
            case 1:
                this.pointsBlue++;
            break;
            default:
                //
        }

        this.disableMapField(id);
    }
    disableMapField(id:number) {
        this.codeCardCompList.forEach(component => {
            console.log(id, component.myId);
            if (component.myId == id) {
                component.is_mapOpen = true;
            }
            });
    }

    getRandomList():number[] {
        let baseAr =  [
            0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,
            2,2,2,2,2,2,
            3
        ];
        let resultLi:number[] = [];
        let z = baseAr.length;
        while (baseAr.length > 0) {
            let zufIndex = Math.floor(Math.random() * (baseAr.length) );
            resultLi.push(baseAr[zufIndex]);
             baseAr.splice(zufIndex,1);
        }


        return resultLi;

    }


}