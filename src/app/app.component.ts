import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  mobileScreen: MediaQueryList;
  title = 'ui';
  constructor() {
    this.mobileScreen = window.matchMedia("(max-width: 990px)");
  }
  ngOnInit() {
    this.setupEventListeners();
  }
  setupEventListeners() {
    document.querySelectorAll(".dashboard-nav-dropdown-toggle").forEach(item => {
      item.addEventListener('click', event => {
        const closestDropdown = item.closest(".dashboard-nav-dropdown");
        closestDropdown.classList.toggle("show");
        closestDropdown.querySelectorAll(".dashboard-nav-dropdown").forEach(subDropdown => {
          if (subDropdown !== closestDropdown) {
            subDropdown.classList.remove("show");
          }
        });
        closestDropdown.parentElement.querySelectorAll(":scope > .dashboard-nav-dropdown").forEach(sibling => {
          if (sibling !== closestDropdown) {
            sibling.classList.remove("show");
          }
        });
      });
    });

    document.querySelectorAll(".menu-toggle").forEach(item => {
   item.addEventListener('click', event => {
    if (this.mobileScreen.matches) {
      document.querySelector(".dashboard-nav").classList.toggle("mobile-show");
    } else {
      document.querySelector(".dashboard").classList.toggle("dashboard-compact");
    }
  });
});
}
}
