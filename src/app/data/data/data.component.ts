import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss', '../../styles/page_style.scss']
})
export class DataComponent implements OnInit {

  data: Reservation[];

  displayedColumns: string[] = ["Gebruiker", "Stoel", "Sectie/Campus", "Tijdstip", "Status"];
  dataSource = new MatTableDataSource<Reservation>();

  pageLoaded: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private _dataService: DataService) {
    
   }

  ngOnInit(): void {
    this._dataService.getData().subscribe(data=>{
      this.data = data;
      this.dataSource.data = this.data;
      this.pageLoaded = true;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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


}
