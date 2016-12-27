import {Component, OnInit} from "@angular/core";
import {WordsService} from "./words.service";

@Component ({
    selector: 'game',
    template: `
    <div class="buttonRow">
        <button *ngFor="let btn of btns; let j=index" (click)="playGame(j)">{{j+1}}</button>
    </div>
<div class="wrapper">
<div class="counter">
<div class="group-red" [ngClass]="{'backgr': pointsRed>=9}">{{pointsRed}}/9</div>
<div class="group-blue" [ngClass]="{'backgr': pointsBlue>=9}">{{pointsBlue}}/9</div>

</div>
<div class="wrapper-cards">
<code-card *ngFor="let item of list; let i=index"
[name]="item"
[myColorNr]="colorList[i]"
[is_map]="false"
(sendColorNr)="onSendColorNr($event)"
 >

</code-card>
<div>Spiel Nr: {{numberOfGame + 1}}</div>
</div>
    <div class="wrapper-map">
    <code-card *ngFor="let item of list; let i=index"
    [myColorNr]="colorList[i]"
    [is_map]="true">
    
    </code-card>
    </div>

</div>
`,
    styles: [`
:host {
font-size: 32px;
font-weight: 900;
}
.wrapper-cards {
    margin: 0 auto;
 width: 800px;
 height: 400px;
 border: 1px solid white;
}

.wrapper-map {
margin: 0 auto;
margin-top: 90px;
 width: 100px;
 height: 100px;
 border: 1px solid white;
}

.counter {
 position: relative;
}
.counter > div {
 padding: 10px;
}
.group-red {
position: absolute;
top:40px;
left: 10px;
color: red;
}
.group-blue {
position: absolute;
top:40px;
right: 10px;
color: blue;
}
.backgr {
background: black;
}
.buttonRow {
margin-top: 120px;
}
.buttonRow button {
 padding: 12px 8px;
 margin-right: 10px;
}
`],
    providers: [WordsService],
})
export class GameComponent implements OnInit {
    colorList:number[];
    pointsRed:number;
    pointsBlue:number;
    btns:number[] = [0,1,2,3,4,5,6,7,8,9,10,11];
    list:string[];
    numberOfGame:number = 0;

    constructor(private worsdservice:WordsService ) {

    }
    playGame(nr:number) {
        this.numberOfGame = nr;
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.colorList = this.getRandomList();
        this.pointsBlue = 0;
        this.pointsRed = 0;
        this.worsdservice.getWords(this.numberOfGame).then(list => this.list = list );
        // getHeroesSlowly().then(heroes => this.heroes = heroes);
    }
    onSendColorNr(colorNr:number) {
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
    }

    getWords():string[] {
                return [
                    'Auge',
                    'Brille', 'Abfalleimer',
                    'Not', 'gelb', 'Husten', 'Bonbon', 'Amerika',
                    'Apfel', 'Süssigkeit', 'Elbe', 'Hamburg',
                    'Konzert', 'Lang Lang', 'Gold', 'Stoff',
                    'Tatort', 'Getränk', 'Katze', 'Wald',
                    'Rucksack', 'Laptop', 'Kreide', 'Bluse',
                    'Rohrstock'
                ];
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