import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  public saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user))
  }
  public getUser(): any {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }

  isEntreprise(){
    if(this.getUser().roles.includes('ROLE_ADMIN_ENTREPRISE')||this.getUser().roles.includes('ROLE_AGENT_ENTREPRISE'))
      return true
    else
      return false
  }
  isCabinet(){
    if(this.getUser().roles.includes('ROLE_ADMIN_CABINET')||this.getUser().roles.includes('ROLE_AGENT_CABINET'))
      return true
    else
      return false
  }

  signOut(): void {
    localStorage.clear();
  }
}
