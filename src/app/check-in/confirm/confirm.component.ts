import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Key } from 'src/app/models/key.model';
import { User } from 'src/app/models/user.model';
import { KeyService } from 'src/app/services/key.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss', '../../styles/page_style.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  idUser: number;
  idCurrentUser: number;
  currentUser: User;

  realKey: string;
  confirmKey: string;

  userSub: Subscription;
  keySub: Subscription;

  checkinError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _keyService: KeyService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
      // starts with user = null => if user is set, check if right user is on this page
      if (user && this.idUser) {
        this.idCurrentUser = user.id;
        if (+this.idCurrentUser !== +this.idUser) {
          this.router.navigate(['/']);
        }
      }
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.idUser = +params['id'];
      }
    )

    this.confirmKey = this._keyService.getConfirmKey();

    this.keySub = this._keyService.getKeys().subscribe((keys: Key[]) => {
      this.realKey = keys[0].name;
    });

  }

  onConfirm() {
    // check if current key is the same as real key from database
    if (this.confirmKey === this.realKey) {
      let updatedUser = this.currentUser;
      updatedUser.present = true;
      this._userService.updateUser(updatedUser).subscribe((user: User) => {
        this._authService.user.next(user);
      }, error => {
        updatedUser.present = false; // turn user in angular back to not present
        this._authService.user.next(updatedUser);
        this.checkinError = true;
        console.log('User kan niet worden geupdate');
      });
     
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
