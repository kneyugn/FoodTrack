import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {RouterExtensions} from "nativescript-angular";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["components/css/icons.css", "/app.css"]
    // styleUrls: ['./recipeDetails.component.css', "./css/icons.css"],
})

export class AppComponent implements AfterViewInit, OnInit {
    private _mainContentText: string;

    // icone for side bar
    private search = String.fromCharCode(0xe986);
    private fork = String.fromCharCode(0xe9a3);
    private person = String.fromCharCode(0xe971);
    private bookMark = String.fromCharCode(0xe9d2);


    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private routerExtensions: RouterExtensions,) {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    goBack() {
        this.routerExtensions.back();
    }
}