import {Component, OnInit} from "angular2/core";
import {CanActivate} from "angular2/router";
import {LoginService} from "app/login/services/login.service";
import {isLoggedIn} from "app/login/utils/isLoggedIn";


@Component({
  selector: "dashboard",
  templateUrl: "app/dashboard/templates/dashboard.template.html",
  styleUrls: ["app/dashboard/css/dashboard.css"],
  providers: [LoginService]
})
@CanActivate(isLoggedIn)
export class Dashboard implements OnInit {
  userEmail: String;
  constructor(private _loginService: LoginService) {
  }
  ngOnInit() {
    this.userEmail = this._loginService.getCurrentUser().email;
  }
  logout() {
    this._loginService.logout();
  }
}
