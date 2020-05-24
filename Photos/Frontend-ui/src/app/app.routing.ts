
//import route modules

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';

//import components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SearchComponent } from './panel/components/search/search.component';

//route array
const appRoutes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', canActivate:[NoIdentityGuard], component: LoginComponent },
    { path: 'register', canActivate:[NoIdentityGuard], component: RegisterComponent },
    { path: 'settings', canActivate:[UserGuard], component: UserEditComponent},
    { path: 'search/:search', canActivate:[UserGuard], component: SearchComponent },
    { path: '**', component: LoginComponent }

];

//export settings
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);