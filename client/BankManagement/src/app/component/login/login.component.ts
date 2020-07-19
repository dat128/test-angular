import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  user: User;
  message: string;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('accessToken');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.user = this.loginForm.value;
    this.authService.login(this.user).subscribe(data => {
      if (data.success === true) {
        window.localStorage.setItem('accessToken', data.accessToken);
        this.router.navigate(['account']);
      } else {
        this.invalidLogin = true;
        this.message = data.message;
      }
    });
  }

}
