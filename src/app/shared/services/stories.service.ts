import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable} from 'rxjs';
import { map, switchMap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private http: HttpClient) { }

  getStories() {
    return this.http.get<any>('https://hacker-news.firebaseio.com/v0/topstories.json');
  }

  getItem(storyid:any) {
    return this.http.get<any>('https://hacker-news.firebaseio.com/v0/item/'+storyid+'.json');
  }

  getUser(userid:any) {
    return this.http.get<any>('https://hacker-news.firebaseio.com/v0/user/'+userid+'.json');
  }

}

