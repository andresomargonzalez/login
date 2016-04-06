import {Component} from "angular2/core";
import {CanActivate} from "angular2/router";
import {isLoggedIn, LoginService} from 'app/login/services/login.service';

@Component({
  selector: "dashboard",
  templateUrl: "app/dashboard/templates/dashboard.template.html",
  providers: [LoginService]
})
@CanActivate(isLoggedIn)
export class Dashboard {
  constructor(private _loginService: LoginService) {

  }
  logout() {
    this._loginService.logout();
  }
}
