import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,QRCodeModule],
})


export class HomePage {

    // https://www.npmjs.com/package/angularx-qrcode
    qrCodeString = 'This is a secret qr code message';

  constructor() {}
}
