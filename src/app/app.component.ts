import { Component, OnInit } from '@angular/core';
import { StoriesService } from './../app/shared/services/stories.service';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private storiesService: StoriesService) { }
  title = 'testApp';
  result: any[] = [];
  items: any[] = [];
  users: any[] = [];

  ngOnInit() {

    let stories$ = this.storiesService.getStories().subscribe(stories => {
      const random_stories = stories.sort(() => Math.random() - Math.random()).slice(0, 10);

      return of(random_stories).pipe(
        switchMap(stories => {
          const get_items$: Observable<any>[] = [];
          stories.forEach(element => {
            const items$ = this.storiesService.getItem(element);
            get_items$.push(items$);
          });
          return forkJoin(get_items$);
        }),
      ).subscribe(data2 => {
        this.items = data2;
        return of(data2).pipe(
          switchMap(items => {
            const get_users$: Observable<any>[] = [];
            items.forEach(element => {
              const items$ = this.storiesService.getUser(element.by);
              get_users$.push(items$);
            });
            return forkJoin(get_users$);
          }),

        ).subscribe(res => {
          this.users = res;
          let result = this.items.map((e, i) => {
            let items = e;
            let users = this.users[i];
            return [items, users];
          });

          this.result = result.sort((a,b) => a[0].score - b[0].score);

        });
      });

    });

  }
}
