import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    self.addEventListener('activate', event => {
      // event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.filter(cacheName => {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(cacheName => {
              return caches.delete(cacheName);
            })
          );
        });
      // );
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTo(0, 0);
    });
  }
}
