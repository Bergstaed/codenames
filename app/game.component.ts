import {Component, OnInit, ViewChildren, QueryList} from "@angular/core";
import {WordsService} from "./words.service";
import {CodeCardComponent} from "./code-card.component";

@Component ({
    selector: 'game',
    template: `
<ng-content select="h1"></ng-content>
<ng-content select="[head2]"></ng-content>
<ng-content select=".head3"></ng-content>
<ng-content select=".head4"></ng-content>
    <div *ngIf="isButtonbarOpen" class="buttonRow fixed">
        <button (click)="playRandomGame()">**</button>
        <button *ngFor="let btn of btns; let j=index" (click)="playGame(j)">{{j+1}}</button>
        <button style="margin-left: 5px" (click)="isButtonbarOpen=false">x</button>
    </div>
    
    <div *ngIf="isQrbarOpen" class="qrRow fixed clear">
        <div (click)="isQrbarOpen=false">
            <img [src]="getQR('red')" alt="">
            <img [src]="getQR('blue')" class="right" alt="">
        </div>
    </div>
<div class="wrapper">
<div class="counter">
<div>
    <button (click)="changeGameNr(-1)" [disabled]="hasRandomGameNrMode">-</button>
    <span class="gameNr" (click)="isButtonbarOpen = true">
    <span *ngIf="hasRandomGameNrMode">Zufallsspiel</span>
    <span *ngIf="!hasRandomGameNrMode">Spiel Nr: {{numberOfGame + 1}}</span>
    </span>
    <button (click)="changeGameNr(1)" [disabled]="hasRandomGameNrMode">+</button>
    <button (click)="isQrbarOpen=!isQrbarOpen" class="distLeft">QR-Codes</button>
    <button (click)="isColorMapVisible=!isColorMapVisible" class="distLeft">
        <span *ngIf="!isColorMapVisible">zeige </span>
        <span *ngIf="isColorMapVisible">verstecke </span>
        Zuordnungsfeld
    </button>
    <button (click)="changeGameNr(0)" class="distLeft">Neue Zuordnung</button>
    <span class="distLeft light"> - ({{numberOfWords}} Begriffe)</span>
</div>
<div class="group-red" 
(click)="showExtraInfo=0"
    [ngClass]="{'backgr': pointsRed >= pointsLimit('red'),
    'startBorder':this.startPlayerNr == 0}">
{{pointsRed}}/{{pointsLimit('red')}}
</div>
<div class="group-blue"
(click)="showExtraInfo=1"
    [ngClass]="{'backgr': pointsBlue >= pointsLimit('blue'),
    'startBorder':this.startPlayerNr == 1}">
{{pointsBlue}}/{{pointsLimit('blue')}}
</div>

</div>
<div class="wrapper-cards">
<code-card *ngFor="let item of list; let i=index"
[name]="item"
[myColorNr]="colorList[i]"
[is_map]="false"
[myId]="i"
[extraInfo]="showExtraInfo"
(sendColorNr)="onSendColorNr($event)"
 >
</code-card>
</div>
    <div class="wrapper-map">
        <code-card *ngFor="let item of list; let i=index"
        [myColorNr]="colorList[i]"
        [ngClass]="{'transp': !isColorMapVisible}"
        [is_map]="true"
        [myId]="i"
        >
        
        </code-card>
    </div>

</div>
<div>{{duplicates}} <a href="https://www.google.de/search?as_st=y&tbm=isch&hl=de&as_q=wimmelbilder&as_epq=&as_oq=&as_eq=&cr=&as_sitesearch=&safe=images&tbs=isz:lt,islt:xga" target="_blank">Wimmelbilder</a></div>
`,
    styles: [`

.fixed {
position: fixed;
}
.clear {
clear: both;
}
.right {
float: right;
}
.left {
float: left;
}
.transp {
opacity: 0;
}
.light {
opacity: 0.3;
}
.distLeft {
margin-left: 50px;
}
.qrRow {
top: 50px;
width: 100%;
z-index: 250;
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

.startBorder {
    border-bottom: 8px solid white;
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
z-index: 300;
}
.buttonRow button {
font-size: 20px;
 padding: 4px 2px;
 width: 40px;
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
    numberOfWords:number;
    clickList:boolean[];
    numberOfGame:number = 0;
    isButtonbarOpen:boolean;
    hasRandomGameNrMode:boolean;
    showExtraInfo:number = -1;
//    isQrbarOpen:boolean;
    startPlayerNr:number = 0;

    @ViewChildren(CodeCardComponent) codeCardCompList : QueryList<CodeCardComponent>;


    constructor(private worsdservice:WordsService ) {
    }

    playGame(nr:number) {
        this.hasRandomGameNrMode = false;
        this.numberOfGame = nr;
        this.ngOnInit();
        this.isButtonbarOpen = false;
    }
    playRandomGame() {
        this.hasRandomGameNrMode = true;
        this.ngOnInit();
        this.isButtonbarOpen = false;
    }

    changeGameNr (addMe:number) {
        let newNumber:number = this.numberOfGame + addMe;
        if (newNumber >= 0 && newNumber < this.btns.length) {
            this.numberOfGame += addMe;
            this.ngOnInit();
        }

        if (addMe === 0) {
            // change again:
            this.ngOnInit();
        }
    }

    ngOnInit(): void {
        this.clickList = this.getFalseList(25);
        this.changeStartPlayer();
        this.showExtraInfo = -1;
        this.isButtonbarOpen = false;
        this.colorList = this.getRandomList(this.startPlayerNr);
        this.pointsBlue = 0;
        this.pointsRed = 0;
        this.worsdservice.getWords(this.numberOfGame, this.hasRandomGameNrMode).then(list => this.list = list );
        this.worsdservice.getNumberOfGames().then(n => this.btns = n);

        this.worsdservice.findDuplicates().then(n => this.duplicates = n);



        this.worsdservice.getNumberOfwords().then(n => this.numberOfWords = n);
    }

    pointsLimit (col:string):number {
        if (col === 'red') {
            return 8 + (this.startPlayerNr == 0 ? 1 : 0);
        } else {
            return 8 + (this.startPlayerNr == 1 ? 1 : 0);
        }
    }

    getFalseList(cnt:number) : boolean[] {
        let results = [];
        for (let i = 0; i < cnt; i++) {
                results.push(false);
        }
        return results;
    }
    getQR (col:string):string {
        //let color:string = col=='red'? 'ff4540':'1e90ff';
        let color:string = col=='red'? 'f00':'00f';
        let api:string = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&color='+
            color +'&margin=10&data=';
        let wordsRed = this.getwords('red','\n') +
            '\n\nNICHT: (' +
            this.getwords('black','','**') + ', ' +
            this.getwords('blue',', ') + ' - \n' +
            this.getwords('grey',', ') +')';
        let wordsBlue =  this.getwords('blue','\n') +
            '\n\nNICHT: (' +
            this.getwords('black','','**') + ', ' +
            this.getwords('red',', ') + ' - \n' +
            this.getwords('grey',', ') +')';
        if (col === 'red') {
            return api + encodeURIComponent(this.replaceUmlaute(wordsRed));
        } else {
            return api + encodeURIComponent(this.replaceUmlaute(wordsBlue));
        }
    }

    private getwords(col: string, delimitter: string, marked:string = ''): string {
        let result:string = marked;
        let colNr:number = col ==='red'? 0:1;
        if (col ==='black') { colNr = 3;}
        if (col ==='grey') { colNr = 2;}

        for (let i:number=0; i< this.list.length; i=i+1) {
            //let codeCard: CodeCardComponent = this.codeCardCompList[i];
            if (this.colorList[i]===colNr && !this.clickList[i]) {
                result += this.list[i] + delimitter;
            }
        }
        result = result.slice(0,result.length - delimitter.length);
        return result + marked;
    }

    replaceUmlaute(str:string):string {
       str = str.replace('ä','ae').replace('ö','oe').replace('ü','ue').
        replace('Ä','Ae').replace('Ö','Oe').replace('Ü','Ue').replace('ß','ss');
        return str;
    }

    changeStartPlayer() {
        this.startPlayerNr +=1;
        if (this.startPlayerNr > 1) {
            this.startPlayerNr = 0;
        }
    }

    onSendColorNr(id:number) {
        this.clickList[id] = true; // TODO Austausch clicklist gegen einfachen Zugriff component
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
            if (component.myId == id) {
                component.is_mapOpen = true;
            }
            });
    }

    /**
     *
     * @param startPlayerNr:    0: red,  1: blue;
     * @returns {number[]}
     */
    getRandomList(startPlayerNr:number):number[] {
        let baseAr =  [
            0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,
            2,2,2,2,2,2,2,
            3
        ];
        baseAr.push(startPlayerNr);

        let resultLi:number[] = [];
        while (baseAr.length > 0) {
            let zufIndex = Math.floor(Math.random() * (baseAr.length) );
            resultLi.push(baseAr[zufIndex]);
             baseAr.splice(zufIndex,1);
        }


        return resultLi;

    }


}