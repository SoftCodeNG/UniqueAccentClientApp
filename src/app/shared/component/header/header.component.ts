import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      const overlay = document.getElementById('overlay') as HTMLDivElement;
      const navBar = document.getElementById('navBar') as HTMLDivElement;
      overlay.classList.remove('show');
      navBar.classList.remove('show');
      this.showMenu = false;
    });
  }

  toggleMenu(): void {
    const overlay = document.getElementById('overlay') as HTMLDivElement;
    const navBar = document.getElementById('navBar') as HTMLDivElement;
    if (this.showMenu === true) {
      overlay.classList.remove('show');
      navBar.classList.remove('show');
      this.showMenu = false;
    } else {
      overlay.classList.add('show');
      navBar.classList.add('show');
      this.showMenu = true;
    }
  }
}
