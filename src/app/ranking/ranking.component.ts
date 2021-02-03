import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss', '../styles/page_style.scss']
})
export class RankingComponent implements OnInit {

  userListOrdered: User[] = [];

  pageLoaded: boolean = false;

  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe((users: User[]) => {
      users.sort((a, b) => (a.coins > b.coins) ? -1 : 1);
      this.userListOrdered = users;
      this.pageLoaded = true;
    })
  }

  onClickHome() {
    this.router.navigate(['/home'])
  }
}
