import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Kitchen } from '../models/kitchen.model';
import { KitchenService } from '../services/kitchen.service';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss', '../styles/page_style.scss']
})
export class PauseComponent implements OnInit {

  kitchens: Kitchen[];

  pageLoaded: boolean = false;

  constructor(private router: Router, private _kitchenService: KitchenService) {
   }

  ngOnInit(): void {
    this._kitchenService.getKitchens().subscribe((kitchens) =>{
      this.kitchens = kitchens;
      this.pageLoaded = true;
    });
    
  }

  toHome() {
    this.router.navigate(['/home'])
  }
}
