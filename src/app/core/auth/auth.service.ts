import { Injectable } from "@angular/core";
import { KeycloakProfile } from "keycloak-js";
import { KeycloakEventType, KeycloakService } from "keycloak-angular";
import { Router } from "@angular/router";
import { QuoteService } from "../http/QuoteService.service";
import { take, timer } from "rxjs";
import { MessageService } from "primeng/api";
@Injectable({ providedIn: "root" })
export class AuthService {
  public profile: KeycloakProfile|undefined;
  public isUserOnline: boolean = false; // Flag to indicate user's online status
  public motivationalQuote: any = null;
  public lat:string;
  public lon:string;

  constructor(public kcService: KeycloakService , private router :Router,private quoteService:QuoteService,private messageService:MessageService) {
    this.init();
  }

  init() {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.profile = JSON.parse(storedProfile);
    }
    console.log(this.kcService.isLoggedIn())
    this.isUserOnline = this.kcService.isLoggedIn();
    this.loadUserProfile();

    if(!navigator.geolocation){
      console.log("location is not supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(
        `lat:${position.coords.latitude},lon:${position.coords.longitude}`
      )
    })
  }
 
  
  private loadUserProfile() {
    this.kcService
      .loadUserProfile()
      .then((profile) => {
        this.profile = profile;
        localStorage.setItem('profile', JSON.stringify(profile)); 
        console.log("User Profile:", this.profile);
        if (this.isAuthenticated()) {
          // this.fetchMotivationalQuote(); // Fetch a motivational quote after successful login
        }
      })
      .catch((error) => {
        console.error("Error loading user profile:", error);
      });
  }

  public async logout(redirectUri?: string) {
    const options = {
      redirectUri :"http://localhost:4200/"
    };
    await this.kcService.logout(options?.redirectUri);
    this.profile = undefined;
    console.log("Logged out",this.isAuthenticated());
  }


  public getAuthenticatedUsername(): string | undefined {
    return this.profile?.username;
  }

  public async getAuthenticatedUserId(): Promise<string | undefined> {
    await this.init();
    return this.profile?.id;

  }

  public hasRoleIn(roles: string[]): boolean {
    let userRoles = this.kcService.getUserRoles();
    for (let role of roles) {
      if (userRoles.includes(role)) return true;
    }
    return false;
  }
  
  public isAuthenticated(): boolean {
    
    return this.kcService.isLoggedIn();
    
  }

  public async register(
    options: Keycloak.KeycloakLoginOptions = { action: 'register', redirectUri: 'http://localhost:4200/login' }
  ) {
    await this.kcService.register(options)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }
  
  
  public async login(options: Keycloak.KeycloakLoginOptions = {}) {
    
    await this.kcService.login(options);
    await this.kcService.isLoggedIn();    

  }

  // public fetchMotivationalQuote() {
  //   this.quoteService.getQuotes().subscribe(
  //     (quote) => {
  //       this.motivationalQuote = quote[0]; // Assuming the first quote in the response array
  //       console.log('Motivational Quote:', this.motivationalQuote);
  //       this.showMotivationalQuote();
  //     },
  //     (error) => {
  //       console.error('Error fetching motivational quote:', error);
  //     }
  //   );
  // }

  // public showMotivationalQuote() {
  //   this.messageService.add({
  //     severity: 'info', // You can adjust the severity as needed (info, success, warn, error)
  //     summary: 'Motivational Quote',
  //     detail: `${this.motivationalQuote.q} - ${this.motivationalQuote.a}`, // Assuming q is the quote and a is the author
  //     life: 5000 // Duration in milliseconds (5 seconds)
  //   });
  // }

}