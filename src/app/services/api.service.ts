import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "https://api.football-data.org/v2/";
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.loadHeaders();
  }

  public loadHeaders() {
    this.headers = new HttpHeaders({
      'X-Auth-Token': '0bba926256da49e7a0f093c2494715d6'
    });       
  }

  get = async (endpoint: string, filters?: HttpParams) : Promise<any> => {    
    return await this.http.get(this.baseUrl.concat(endpoint), {
      headers: this.headers
    }).toPromise();
      //.subscribe(apiData => (console.log(apiData)));
  }
  /*
  public get(endpoint: string, filters?: Object) {
    this.http.get(this.baseUrl.concat(endpoint), {}, this.headers)
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });      
  }
  */
}
