import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../shared/services/http.service';

@Injectable()
export class EmailService {
  private domain = 'email';

  constructor(private _httpService: HttpService) {
  }

  public getEmails(): Observable<any> {
    return this._httpService.generateRequest('GET', this.domain, null, null, null);
  }

  public deleteEmail(id: string): Observable<any> {
    return this._httpService.generateRequest('DELETE', this.domain, id, null, null);
  }

  public postEmail(content): Observable<any> {
    return this._httpService.generateRequest('POST', this.domain, null, null, {content: content});
  }
}
