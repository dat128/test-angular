import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'account' },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
