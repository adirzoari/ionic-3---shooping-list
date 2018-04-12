import { PhotoShoppingListPage } from './../../photo-shopping-list/photo-shopping-list';
import { SharedListPage } from './../../shared-list/shared-list';
import { Component } from '@angular/core'
import { ViewController , NavController } from 'ionic-angular';

@Component({
    selector: 'page-shopping-pop',
    template: `
        <ion-grid text-center>
            <ion-row>
            <ion-col>
                <h3>My shoopint list</h3>
            </ion-col>
            </ion-row>

            <ion-row>
            <ion-col>
                <button ion-button outline (click)="navToPage('PhotoShoppingListPage')">My Photos List</button>
            </ion-col>
            </ion-row>

            <ion-row>
            <ion-col>
                <button ion-button outline (click)="navToPage('SharedListPage')">My Shared Shopping</button>
            </ion-col>
            </ion-row>
        </ion-grid>
    `
})

export class ShoppingPop {
    
    constructor(private viewCtrl: ViewController,public navCtrl:NavController) {}
    
    onAction(action: string) {
        this.viewCtrl.dismiss({action: action});

    }
    navToPage(page){
        var pageComponent = page =='SharedListPage'? SharedListPage : PhotoShoppingListPage;
        this.navCtrl.push(pageComponent);
    }

}