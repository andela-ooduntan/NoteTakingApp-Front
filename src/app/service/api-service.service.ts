import {Inject, Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiServiceService {
  public bodyData: string;
  public httpService;
  private options;
  public service: any;



  constructor(@Inject(Http) http: Http) {
    this.httpService = http;
  }

  request(url: string, type: string, data?: any): Observable<any> {
    this.bodyData = data;
    const header = new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
    this.options = new RequestOptions(header);
    switch (type.toLowerCase()) {
      case 'get':
        this.service = this.httpService.get(url, this.options);
        break;
      case 'post':
        this.service = this.httpService.post(url, this.bodyData);
        break;
      case 'put':
        this.service = this.httpService.put(url, this.bodyData, this.options);
        break;
      case 'delete':
        this.service = this.httpService.delete(url, this.options);
        break;
    }
    return this.service;
    // if (this.service) {
    //   return this.service.map((res: any) => {
    //     return res._body !== '' ? res.json() : null;
    //   }).catch((error: any) => {
    //     let requestError = error.status !== 0 ? error._body : '{ \"message\": \"Could not connect to server\" }';
    //     try {
    //       requestError = JSON.parse(requestError);
    //     } catch (e) {
    //       requestError = '';
    //     }
    //     console.log(error, 'this is the name of the service');
    //     return Observable.throw(requestError || 'Server error');
    //   });
    // }
  }
}
