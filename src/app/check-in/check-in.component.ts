import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss', '../styles/page_style.scss']
})
export class CheckInComponent implements OnInit, AfterViewInit {
  scanActive: boolean = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  constructor(private plt: Platform) {
    const isInStandaloneMode = () => 'standelone' in window.navigator && window.navigator['standelone'];
    if (this.plt.IOS && isInStandaloneMode()) {
      console.log('I am a an IOS!')
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  async startScan() {
    // navigator.mediaDevice is not recognized/protected on Iphone ==> Scanner wil only work in safari
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
    // scanActive => can be made with loading spinner
    this.scanActive = true;
  }

  async scan() {
    console.log('SCAN');

    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      console.log('code: ', code);

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;

      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }

    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  // helper functions
  stopScan() {
    console.log('stopped scan')
    this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

}
