import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserWithRoles } from '../../../../shared/models/UserWithRoles';

@Component({
  selector: 'app-users-carousel',
  templateUrl: './users-carousel.component.html',
  styleUrls: ['./users-carousel.component.scss']
})
export class UsersCarouselComponent implements OnInit {
  allRealmUsers: UserWithRoles[] = [];
  activeRealmUsers: string[] = [];
  responsiveOptions:any;
  constructor(private authService: AuthService) {
 
  }

  ngOnInit(): void {
    this.responsiveOptions = [
      { breakpoint: '1600px', numVisible: 7, numScroll: 3 },
      { breakpoint: '1200px', numVisible: 5, numScroll: 3 },
      { breakpoint: '768px', numVisible: 3, numScroll: 3 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];
    // Fetch data from the service
    this.authService.fetchAllUsersWithRoles();
    const clientId = 'b91eccdd-8bf6-4c4e-9f35-561abaef3742';
    
    this.authService.fetchActiveSessions(clientId);
    // Assign the service lists to component properties for template access
    this.allRealmUsers = this.authService.AllRealmUsers;
    this.activeRealmUsers = this.authService.ActiveRealmUsers;

    
  
  }
    // Function to check if a user is active
    isUserActive(user: UserWithRoles): boolean {
      console.log(user)
      return this.activeRealmUsers.includes(user.username);
    }
      // Function to check if user has Admin role
  hasAdminRole(user: UserWithRoles): boolean {
    const roles = user.roles.map(role => role.toUpperCase());
    return roles.includes('ADMIN');
  }
 
}

