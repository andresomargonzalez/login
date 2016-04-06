import {Component} from "angular2/core";
import {LoginService} from "../services/login.service";


@Component({
  selector: "login",
  templateUrl: "app/login/templates/login.template.html",
  styleUrls: ["app/login/css/login.css"],
  providers: [LoginService]

})

export class Login {
  username: String;
  password: String;

  constructor(private _loginService: LoginService) {
  }
  authenticate() {
    this._loginService.authenticate(this.username, this.password);
  }
  signUp() {
    this._loginService.signUp(this.username, this.password);
  }
}
