import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {TokenStorageService} from "../../../core/auth/token-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public form: FormGroup;
  public errorMessage: any;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private storage: TokenStorageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    let credentials = {
      email: this.form.get("email")?.value,
      password: this.form.get("password")?.value,
    };

    this.authService.login(credentials).subscribe((res) => {
      if(res.token != null)
        this.storage.saveToken(res.token);
      if(res.data != null)
        this.storage.saveUser(res.data);
      this.router.navigate(["/categories"]);

    });
  }
}
