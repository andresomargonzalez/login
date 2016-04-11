/**
 * Created by Omar on 4/6/16.
 */
import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Headers} from "angular2/http";
import {Router} from "angular2/router";

@Injectable()
export class LoginService {
  private _loggedUser;
  constructor(private _http: Http, private _router: Router) {
    this._loggedUser = null;
  }
  authenticate(username, pass) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let jsondata = JSON.stringify({email: username, password: pass});
    this._http.post('http://localhost:3003/api/authenticate', jsondata, {headers: headers})
    .map(res => res.json())
    .subscribe(res => this._checkResponse(res));

  }
  signUp(username, pass) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let jsondata = JSON.stringify({email: username, password: pass});
    this._http.post('http://localhost:3003/api/register', jsondata, {headers: headers})
      .map(res => res.json())
      .subscribe(res => this._checkResponse(res));
  }

  /**
   * retrieve current user from node server
   */
  getCurrentUser() {
    console.log(localStorage.getItem('current_user'));
    return  JSON.parse(localStorage.getItem('current_user'));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this._router.navigate(['Login']);
  }
  isLoggedIn() {
    return this.isLoggedIn;
  }

  private _checkResponse(res): void {
    if (res.success) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('current_user', JSON.stringify(res.user));
      this._router.navigate(['Dashboard']);
    } else {
      alert(res.message);
    }
  }
}

