import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ accessToken }`
            }
        });
        return next.handle(request);
    }
}
