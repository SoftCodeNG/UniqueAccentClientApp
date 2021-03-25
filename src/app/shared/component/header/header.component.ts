import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;

  constructor() { }

  ngOnInit(): void {
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
