import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Key } from 'src/app/models/key.model';
import { User } from 'src/app/models/user.model';
import { KeyService } from 'src/app/services/key.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss', '../../styles/page_style.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  idUser: number;
  idCurrentUser: number;

  realKey: string;
  confirmKey: string;

  userSub: Subscription;
  keySub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private _authService: AuthService, private _keyService: KeyService) { }

  ngOnInit(): void {
    this.userSub = this._authService.user.subscribe((user: User) => {
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
    console.log(this.confirmKey)
    console.log(this.realKey)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
