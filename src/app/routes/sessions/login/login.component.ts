import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { LoginService } from '@shared/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private loginService: LoginService,
    private toastrService: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() { }

  login() {
    let username = this.loginForm.get('username').value;
    let clave = this.loginForm.get('password').value;
    this.loginService.login(username, clave).subscribe((res: any) => {
      let token: string = res.access_token;

      // Set user info
      this.settings.setUser({
        id: 99999,
        name: 'Biennnnz',
        email: 'nzb329@163.com',
        avatar: './assets/images/avatar.jpg',
      });

      // Set token info
      this.token.set({ token, username });
      // Regain the initial data
      this.startup.load().then(() => {
        let url = this.token.referrer!.url || '/';
        if (url.includes('/auth')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });
    }, error => {
      this.toastrService.error("Usuario y/o contraseña incorrecta");
    });
  }
}
