import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiServiceService {
  public bodyData: string;
  public httpService;
  public service: any;



  constructor(@Inject(Http) http: Http) {
    this.httpService = http;
  }

  request(url: string, type: string, data?: any): Observable<any> {
    this.bodyData = JSON.stringify(data);
    switch (type.toLowerCase()) {
      case 'get':
        this.service = this.httpService.get(url);
        break;
      case 'post':
        this.service = this.httpService.post(url);
        break;
      case 'put':
        this.service = this.httpService.put(url);
        break;
      case 'delete':
        this.service = this.httpService.delete(url);
        break;
    }
    if (this.service) {
      return this.service.map((res: any) => {
        return res._body !== '' ? res.json() : null;
      }).catch((error: any) => {
        let requestError = error.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
        try {
          requestError = JSON.parse(requestError);
        } catch (e) {
          requestError = '';
        }
        console.log(error, 'this is the name of the service');
        return Observable.throw(requestError || 'Server error');
      });
    }
  }
}
