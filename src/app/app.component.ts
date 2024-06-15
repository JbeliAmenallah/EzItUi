import { Component, HostBinding, AfterViewInit, ElementRef, Renderer2, signal } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { WeatherService } from './core/http/WeatherService.service';
import { NotificationService } from './core/http/notification.service';
import { PublicHolidayService } from './core/http/publicholiday.service';
import { PublicHoliday } from './shared/models/publicholiday';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  darkMode = signal<boolean>(false);
  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
  mobileScreen: MediaQueryList;
  title = 'ui';
  Status: Boolean;
  public profile: KeycloakProfile | undefined;
  username: String;
  weatherData: any;
  weatherIcon: string;
  weatherTooltip: string;
  userId:string;
  public notificationBadge:number=0;
  public notificationList:string[];
  showNotificationList: boolean = false;
  showCalendarPopup: boolean = false;
  calendarBadge:number=0;
  publicHolidays: PublicHoliday[] = [];
  constructor(
    public authService: AuthService,
    private router: Router,
    private titleService: Title,
    private weatherService: WeatherService,
    private el: ElementRef,
    private renderer: Renderer2,
    private notificationService: NotificationService,
    private publicHolidayService:PublicHolidayService
  ) {
    this.mobileScreen = window.matchMedia("(max-width: 990px)");
  }

  async ngOnInit() {
    this.profile=this.authService.profile;
    this.getListPublicHoliday()
    
    this.notificationService.notificationBadge$.subscribe(badge => {
      this.notificationBadge = badge;
    });
  
    this.notificationService.notificationList$.subscribe(list => {
      this.notificationList = list;
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService.getWeatherByCoords(lat, lon).subscribe((weatherData: any) => {
          this.weatherData = weatherData;
          this.setWeatherIcon(this.weatherData.weather[0].id);
          console.log('Weather Data:', JSON.stringify(weatherData));
          this.setWeatherTooltip(this.weatherData);
        });
      });
    }

    this.username = this.authService.getAuthenticatedUsername();
    this.Status = this.authService.isUserOnline;
    this.userId = await this.authService.getAuthenticatedUserId();
    console.log(this.userId)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.root),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe((data: any) => {
      if (data && data.title) {
        this.title = data.title;
        this.titleService.setTitle(this.title);
      } else {
        this.titleService.setTitle('Default Title');
      }
    });
  }
  toggleNotificationList() {
    this.showNotificationList = !this.showNotificationList;
    if (this.showNotificationList) {
        this.notificationBadge = 0; // Reset badge value to 0 when showing the notification list
    }
}
async getListPublicHoliday(): Promise<void> {
  try {
    const items: PublicHoliday[] = await this.publicHolidayService.getAllPublicHolidays().toPromise();
    this.publicHolidays = items.reverse();
    console.log("inside function",this.publicHolidays)
    this.calendarBadge=this.publicHolidays.length;
    console.log("inside",this.calendarBadge)
  } catch (error) {
    console.error('Error fetching public holidays:', error);
  }
}
  setWeatherIcon(weatherId: number) {
    switch (weatherId) {
      case 200:
      case 201:
      case 202:
        this.weatherIcon = 'thunder';
        break;
      case 800:
        this.weatherIcon = 'day';
        break;
      case 801:
      case 802:
      case 803:
      case 804:
        this.weatherIcon = 'cloudy-day-3';
        break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        this.weatherIcon = 'rainy-4';
        break;
      default:
        this.weatherIcon = 'weather';
        break;
    }
  }

  setWeatherTooltip(weatherData: any) {
    const temperatureCelsius = weatherData.main.temp - 273.15;
    const country = weatherData.name;
    this.weatherTooltip = `Temperature: ${temperatureCelsius.toFixed(1)} °C, Country: ${country}, Weather: ${weatherData.weather[0].description}`;
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.setupEventListeners();
  }
  toggleCalendarPopup() {
    this.showCalendarPopup = !this.showCalendarPopup;
  }
  setupEventListeners() {
    this.el.nativeElement.querySelectorAll(".dashboard-nav-dropdown-toggle").forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'click', () => {
        const closestDropdown = item.closest(".dashboard-nav-dropdown");
        if (closestDropdown) {
          closestDropdown.classList.toggle("show");
          closestDropdown.querySelectorAll(".dashboard-nav-dropdown").forEach((subDropdown: HTMLElement) => {
            if (subDropdown !== closestDropdown) {
              subDropdown.classList.remove("show");
            }
          });
          closestDropdown.parentElement?.querySelectorAll(":scope > .dashboard-nav-dropdown").forEach((sibling: HTMLElement) => {
            if (sibling !== closestDropdown) {
              sibling.classList.remove("show");
            }
          });
        }
      });
    });

    this.el.nativeElement.querySelectorAll(".menu-toggle").forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'click', () => {
        if (this.mobileScreen.matches) {
          this.el.nativeElement.querySelector(".dashboard-nav")?.classList.toggle("mobile-show");
        } else {
          this.el.nativeElement.querySelector(".dashboard")?.classList.toggle("dashboard-compact");
        }
      });
    });

    const profileDropdown = this.el.nativeElement.querySelector(".profile-dropdown");
    if (profileDropdown) {
      this.renderer.listen(profileDropdown, 'click', () => {
        const dropdownContent = profileDropdown.querySelector(".dropdown-content");
        dropdownContent?.classList.toggle("show");
      });
    }

    this.renderer.listen(window, 'click', (event) => {
      const profileDropdown = this.el.nativeElement.querySelector(".profile-dropdown");
      const dropdownContent = profileDropdown?.querySelector(".dropdown-content");
      if (profileDropdown && dropdownContent && !profileDropdown.contains(event.target as Node) && !dropdownContent.contains(event.target as Node)) {
        dropdownContent.classList.remove("show");
      }
    });
  }
}
