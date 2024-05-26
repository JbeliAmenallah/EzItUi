import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot,} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    private readonly keycloak: KeycloakService) {
    super(router, keycloak);
    this.roles = this.keycloak.getUserRoles();
    console.log(this.isEMPLOYEE());
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let authenticated = this.keycloak.getKeycloakInstance().authenticated;
    if (!authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data['roles'];

    // Allow if no roles required
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }
        // Check for all required roles
    if(requiredRoles.every(role => this.roles.some(userRole => userRole === role))){
      return true;
    }
    else{
      this.router.navigate(['/not-allowed']);
       return false
    }
  }
  public isEMPLOYEE():Boolean{
  if(this.keycloak.isUserInRole("EMPLOYEE")){
    return true;
  }
  else{
    return false ;
  }
  }
  public async isNotRegistratedAsEMP(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // Check authentication status using Keycloak
    let authenticated = this.keycloak.getKeycloakInstance().authenticated;

    // Redirect to login if not authenticated
    if (!authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
      return false; // Prevent further processing if redirected to login
    }

    // Extract required roles from route data
    const requiredRoles = route.data['roles'];

    // Allow access if no roles required
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Check if user has EMPLOYEE or RH role
    const hasRequiredRole = requiredRoles.some(role => role === 'EMPLOYEE' || role === 'RH' );

    // Return access decision based on required roles and user roles
    if (hasRequiredRole) {
      this.router.navigate(['/not-allowed']);
      return true;
    }

    return false;
   }
}