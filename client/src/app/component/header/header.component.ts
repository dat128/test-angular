import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    const value = JSON.parse(localStorage.getItem('user'));
    if (value) {
      this.username = value.username;
    }
  }

  logOut() {
    this.authService.logout();
  }

}
