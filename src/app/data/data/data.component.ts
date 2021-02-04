import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chair } from 'src/app/models/chair.model';
import { Reservation } from 'src/app/models/reservation.model';
import { DataService } from '../../services/data.service';

interface reservationss {
  id: number;
  date: Date;
  chair: Chair;
  chairname: string;
  username: String;
  sectionName: String;
  Campus: String;
  start: Time;
  end: Time;
  status: string;
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss', '../../styles/page_style.scss']
})

export class DataComponent implements OnInit {

  totalCheckedIn: number = 0;
  totalReservations: number = 0;

  reservationss: reservationss[] = [];
  reservations : Reservation[] = [];

  displayedColumns: string[] = ["Gebruiker", "Stoel", "Sectie/Campus", "Tijdstip", "Status"];
  dataSource = new MatTableDataSource<reservationss>();

  pageLoaded: boolean = false;

  private paginator: MatPaginator;

@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
}

setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;

}

  constructor(private router: Router, private _dataService: DataService) {
    
   }

  ngOnInit(): void {
    this._dataService.getData().subscribe(data=>{
      data.map(data => {
        if (data.present == true) {
          this.reservationss.push({
            id: data.id,
            date: data.date,
            chair: data.chair,
            chairname: data.chair.name,
            username: data.user.name,
            sectionName: data.chair.section.name,
            Campus: data.chair.section.campus.name,
            start: data.start,
            end: data.end,
            status: "Ingechecked"
        

        })
        this.totalCheckedIn += 1;
      }
        else{
            this.reservationss.push({
              id: data.id,
              date: data.date,
              chair: data.chair,
              chairname: data.chair.name,
              username: data.user.name,
              sectionName: data.chair.section.name,
              Campus: data.chair.section.campus.name,
              start: data.start,
              end: data.end,
              status: "Niet Ingechecked"
          
  
          })}
        
      });
      this.totalReservations = this.reservationss.length;    
      this.dataSource.data = this.reservationss;
      this.pageLoaded = true;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator;
  }

  toHome(){
    this.router.navigate(['/home'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload(){
    this.pageLoaded = false;
    this.reservationss = [];
    this._dataService.getData().subscribe(data=>{
      data.map(data => {
        if (data.present == true) {
          this.reservationss.push({
            id: data.id,
            date: data.date,
            chair: data.chair,
            chairname: data.chair.name,
            username: data.user.name,
            sectionName: data.chair.section.name,
            Campus: data.chair.section.campus.name,
            start: data.start,
            end: data.end,
            status: "Ingechecked"
        

        })}
        else{
            this.reservationss.push({
              id: data.id,
              date: data.date,
              chair: data.chair,
              chairname: data.chair.name,
              username: data.user.name,
              sectionName: data.chair.section.name,
              Campus: data.chair.section.campus.name,
              start: data.start,
              end: data.end,
              status: "Niet Ingechecked"
          
  
          })}
        
      });
    
      this.dataSource.data = this.reservationss;
      this.pageLoaded = true;
    })
    this.dataSource.paginator = this.paginator;    
  }

  setBadgeColor(chairoccupancy: boolean){
    if(chairoccupancy == true){
      return "warn";
    }else{
      return "primary";
    }


  }


}
