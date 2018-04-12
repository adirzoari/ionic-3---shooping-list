import { Component } from '@angular/core';
import { IonicPage,Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import { photoShoppingService } from './../../providers/photo-shopping-service/photo-shopping-service';

/**
 * Generated class for the PhotoShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-shopping-list',
  templateUrl: 'photo-shopping-list.html',
})
export class PhotoShoppingListPage {

  userAvatarPicture: Array<any> = new Array;//User picture array becuase we got random pic name
  constructor(public platform: Platform, public afDB: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, private photosService: photoShoppingService) {

  }

  refreshPicture() {
    this.afDB.list('TEST/avatar/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.userAvatarPicture[index] = snapshot.val();
      });
    });
  }

  changePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.photosService.openCamera().then((imageData) => {
              this.photosService.uploadProfilPicture(imageData);
            });
          }
        }, {
          text: 'From gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.photosService.openGallery().then((imageData) => {
              this.photosService.uploadProfilPicture(imageData);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }


}