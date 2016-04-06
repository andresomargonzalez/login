/**
 * Created by Omar on 4/6/16.
 */
/// <reference path="../../../typings/lodash.d.ts" />

import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {

  constructor(private http: Http) {
    this.http = http;
  }
  authenticate(username, pass): Observable {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let jsondata = JSON.stringify({email: username, password: pass});
    return this.http.post('http://localhost:3003/api/authenticate', jsondata, {headers: headers})
    .map(res => res.json());
  }

}
