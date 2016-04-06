/**
 * Created by Omar on 4/6/16.
 */
/// <reference path="../../../typings/lodash.d.ts" />

import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {Router} from "angular2/router";

@Injectable()
export class LoginService {
  private isLoggedIn = false;
  constructor(private _http: Http, private _router: Router) {
    this.isLoggedIn = false;
  }
  authenticate(username, pass) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let jsondata = JSON.stringify({email: username, password: pass});
    this._http.post('http://localhost:3003/api/authenticate', jsondata, {headers: headers})
    .map(res => res.json())
    .subscribe(res => {
        if(res.success){
          this.isLoggedIn = true;
          localStorage.setItem('token', res.token)
          this._router.navigate(['Dashboard']);
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['Login']);

  }
  isLoggedIn() {
    return this.isLoggedIn;
  }

}

export function isLoggedIn() {
  return localStorage.getItem('token')
}
