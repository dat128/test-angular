import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    public getToken(): string {
        return localStorage.getItem('accessToken');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return true;
    }
}
