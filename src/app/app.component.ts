import { Component, HostBinding, signal } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { LayoutService ,AppConfig} from './core/services/app.layout.service';
import { PrimeNGConfig } from 'primeng/api';
import { WeatherService } from './core/http/WeatherService.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  



  darkMode=signal<boolean>(false);
  @HostBinding('class.dark') get mode(){
    return this.darkMode()
  }
  mobileScreen: MediaQueryList;
  title = 'ui';
  Status:Boolean;
  username:String;
  weatherData:any;
  weatherIcon: string;
  weatherTooltip: string;




  constructor(public authService:AuthService,
    private router: Router,
    private titleService: Title,
    private weatherService:WeatherService

  ) {
    
    this.mobileScreen = window.matchMedia("(max-width: 990px)");
  }
  ngOnInit() {
    
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      this.weatherService.getWeatherByCoords(lat, lon).subscribe((weatherData: any) => {
        this.weatherData = weatherData;
        
        this.setWeatherIcon(this.weatherData.weather[0].id);
        console.log('Weather Data:', JSON.stringify(weatherData)); // Log the entire object as a JSON string
        this.setWeatherTooltip(this.weatherData);
        
      });
    });
  }

    this.setupEventListeners();
    console.log( this.authService.getAuthenticatedUserId());
    console.log(this.authService.profile)
    this.Status=this.authService.isUserOnline;
    console.log(this.Status)

    this.username=this.authService.getAuthenticatedUsername();
     // Subscribe to router events to dynamically update the title
     this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      ).subscribe((data: any) => {
        // Update the title based on route data
        if (data && data.title) {
          this.title = data.title;
          this.titleService.setTitle(this.title);
        } else {
          this.titleService.setTitle('Default Title');
        }
      });
    
  }

  setWeatherIcon(weatherId: number) {
    // Map weather condition codes to corresponding icons
    switch (weatherId) {
      case 200:
      case 201:
      case 202:
      // Add more cases as needed for different weather conditions
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
      // Add more cases for other weather conditions
      default:
        this.weatherIcon = 'weather'; // Default icon
        break;
    }
  }


  setWeatherTooltip(weatherData: any) {
    const temperatureCelsius = weatherData.main.temp - 273.15;
    // Extract country name
    const country = weatherData.name;

    // Define the format of the tooltip based on the weather data
    this.weatherTooltip = `Temperature: ${temperatureCelsius.toFixed(1)} °C, Country: ${country}, Weather: ${weatherData.weather[0].description}`;
  }

  logout() {
    this.authService.logout();
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

    // Toggle Profile Dropdown
    const profileDropdown = document.querySelector(".profile-dropdown");
    profileDropdown.addEventListener('click', event => {
        const dropdownContent = profileDropdown.querySelector(".dropdown-content");
        dropdownContent.classList.toggle("show");
    });

    // Close Profile Dropdown when clicking outside
    window.addEventListener('click', function(event) {
        const profileDropdown = document.querySelector(".profile-dropdown");
        const dropdownContent = profileDropdown.querySelector(".dropdown-content");
        if (!profileDropdown.contains(event.target as Node) && !dropdownContent.contains(event.target as Node)) {
            dropdownContent.classList.remove("show");
        }
    });
}

}
