import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member } from './member';
import { Observable } from 'rxjs';

const baseUrl = 'https://membercheck-964415051283.europe-west6.run.app';

@Injectable({
  providedIn: 'root'
})
export class CloudFunctions {

  private httpClient = inject(HttpClient);


  public searchMember(firstName: string, lastName: string): Observable<Member> {
    return this.httpClient.get<Member>(baseUrl, {
      params: { first_name: firstName, last_name: lastName  },
    });
  }

  public verifyMember(member: Member): Observable<Member> {
    return this.httpClient.post<Member>(baseUrl, member);
  }

}
