import { Injectable } from "@angular/core";
import { KeycloakProfile } from "keycloak-js";
import { KeycloakService } from "keycloak-angular";
import { Router } from "@angular/router";
import { QuoteService } from "../http/QuoteService.service";
import { MessageService } from "primeng/api";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserWithRoles } from "../../shared/models/UserWithRoles";

@Injectable({ providedIn: "root" })
export class AuthService {
  public profile: KeycloakProfile | undefined;
  public isUserOnline: boolean = false; 
  public motivationalQuote: any = null;
  public lat: string;
  public lon: string;
  private baseUrl = 'http://localhost:8810/admin/realms/Rh-Application';
  public AllRealmUsers: UserWithRoles[] = []; // List for all realm users with roles
  public ActiveRealmUsers: string[] = [] // List for active session users

  constructor(
    public kcService: KeycloakService,
    private router: Router,
    private quoteService: QuoteService,
    private messageService: MessageService,
    private http: HttpClient // Add HttpClient here

  ) {
    this.init();
  }

  init() {
    this.fetchActiveSessions('29385548-8490-4496-9c51-956ffef43732');
    this.fetchAllUsersWithRoles();
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.profile = JSON.parse(storedProfile);
    }
    console.log(this.kcService.isLoggedIn());
    this.isUserOnline = this.kcService.isLoggedIn();
    this.loadUserProfile();

    if (!navigator.geolocation) {
      console.log("location is not supported");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`lat:${position.coords.latitude},lon:${position.coords.longitude}`);
    });


  }

  private loadUserProfile() {
    this.kcService.loadUserProfile()
      .then((profile) => {
        this.profile = profile;
        localStorage.setItem('profile', JSON.stringify(profile)); 
        console.log("User Profile:", this.profile);
        if (this.isAuthenticated()) {
          // this.fetchMotivationalQuote(); 
        }
      })
      .catch((error) => {
        console.error("Error loading user profile:", error);
      });
  }

  public async logout(redirectUri?: string) {
    const options = {
      redirectUri: "http://localhost:4200/"
    };
    await this.kcService.logout(options?.redirectUri);
    this.profile = undefined;
    console.log("Logged out", this.isAuthenticated());
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

    // Method to get all users with their roles
    public fetchAllUsersWithRoles(): void {
      this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
        switchMap(users => {
          const userRequests = users.map(user =>
            this.http.get<any>(`${this.baseUrl}/users/${user.id}/role-mappings`).pipe(
              map(roleMappings => {
                const realmRoles = (roleMappings.realmMappings || []).map(role => role.name);
                // If client roles are needed, they can be fetched similarly
                // const clientRoles = (roleMappings.clientMappings || {}).flatMap(client => client.map(role => role.name));
                return { username: user.username, roles: realmRoles };
              })
            )
          );
          return forkJoin(userRequests);
        })
      ).subscribe(usersWithRoles => {
        this.AllRealmUsers = usersWithRoles;
        console.log('All Realm Users with Roles:', this.AllRealmUsers);
      });
    }
    

  // Method to get active sessions for a specific client
  public fetchActiveSessions(clientId: string): void {
    this.http.get<any[]>(`${this.baseUrl}/clients/${clientId}/user-sessions`).pipe(
      map(sessions => sessions.map(session => session.username))
    ).subscribe(usernames => {
      this.ActiveRealmUsers = usernames;
      console.log('Active Session Usernames:', this.ActiveRealmUsers);
    });
  }

  // public fetchMotivationalQuote() {
  //   this.quoteService.getQuotes().subscribe(
  //     (quote) => {
  //       this.motivationalQuote = quote[0];
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
  //     severity: 'info',
  //     summary: 'Motivational Quote',
  //     detail: `${this.motivationalQuote.q} - ${this.motivationalQuote.a}`,
  //     life: 5000
  //   });
  // }
}
