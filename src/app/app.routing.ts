import { WelcomeComponent } from './welcome/welcome.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: ':id/members',
    component: MemberListComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
