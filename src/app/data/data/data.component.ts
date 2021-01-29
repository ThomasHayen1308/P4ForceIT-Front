import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss', '../../styles/page_style.scss']
})
export class DataComponent implements OnInit {

  data: Data;

  pageLoaded: boolean = false;

  constructor(private router: Router, private _dataService: DataService) {
    this._dataService.getData().subscribe(data=>{
      this.data = data;
      this.pageLoaded = true;
    })
   }

  ngOnInit(): void {
  }

  toHome(){
    this.router.navigate(['/home'])
  }

  reload(){
    this.pageLoaded = false;
    this._dataService.getData().subscribe(data=>{
      this.data = data;
      this.pageLoaded = true;
    })
  }

}
