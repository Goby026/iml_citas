import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { PeritosComponent } from './pages/peritos/peritos.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // { path: 'pages', component: PagesComponent , children:
    //     pagesRoutes },
    { path: 'dashboard', title:'Dashboard', component: DashboardComponent, children:[
        { path: 'peritos', component: PeritosComponent, title: 'Peritos' }
    ]},
    // { path: 'peritos', component: PeritosComponent },
    { path: '**', component: NoPageFoundComponent },
];
