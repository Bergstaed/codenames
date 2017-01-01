import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core'
import {Widget1Component} from "./widget1.component";

@Component ({
    selector: 'my-app',
    template: `<game>
<h2 head2 *ngIf="showIt">{{head}}</h2>
<h1 *ngIf="showIt" >CodeNames</h1>
<h3 *ngIf="showIt" class="head3">{{head3}}</h3>
<h4>Kein Select im Template</h4>
</game>
<div #footer>
</div>
 `,
    styles: [`
:host {
background: #ddd;
}
`]
})
export class AppComponent implements  OnInit {
    showIt:boolean;
    title:string;
    head:string;
    head3:string;

    @ViewChild('footer', {read:ViewContainerRef}) myFooter;

    constructor(private resolver:ComponentFactoryResolver){}

    ngAfterContentInit(){
        const widget1Faktory = this.resolver.resolveComponentFactory(Widget1Component);
        this.myFooter.createComponent(widget1Faktory);
        this.myFooter.createComponent(widget1Faktory);
        this.myFooter.createComponent(widget1Faktory);
    }

    ngOnInit(): void {
        this.showIt = (Math.random() > 0.9999);
        this.title = 'CodeNames';
        this.head = 'Ein Spiel';
        this.head3 = 'für die ganze Familie';
    }

}
