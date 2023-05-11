import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,QRCodeModule,CommonModule],
})


export class HomePage implements OnInit,OnDestroy {

  // https://www.npmjs.com/package/angularx-qrcode
  qrCodeString = 'This is a secret qr code message';
  barCodeString = 'This is a secret bar code message';
  scannedResult: any;
  //barscannedResult:any;
  content_visibility = '';

  constructor(
    // private barcodeScanner: BarcodeScanner
    ) {}

    ngOnInit(): void {
      JsBarcode("#barcode",  '12345678912', {
        // format: "pharmacode",
         lineColor: "#0aa",
        // width:4,
        height:180,
        displayValue: false
      });
    }

  // startScan() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedResult = barcodeData?.text;
  //    }).catch(err => {
  //        console.log('Error', err);
  //    });
  // }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
      return;
    }
  }

  //data save
  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
      this.stopScan();
  }

}