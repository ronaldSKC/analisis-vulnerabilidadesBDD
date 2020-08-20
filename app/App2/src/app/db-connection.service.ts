import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {
  private svr_ip = 'localhost';
  private svr_port = '3000';
  private svr_url = `http://${this.svr_ip}:${this.svr_port}/`;

  constructor( private _http: HttpClient ) {
  }

  ejecutarSQL(sql: string) {
    return this._http.get(`${this.svr_url}?sql=${sql}`);
  }

}
