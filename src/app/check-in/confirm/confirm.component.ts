import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss', '../../styles/page_style.scss']
})
export class ConfirmComponent implements OnInit, AfterContentChecked, OnDestroy {
  idUser: number;
  idCurrentUser: number;

  key: string;

  userSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {

  }

  ngAfterContentChecked() {
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

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
