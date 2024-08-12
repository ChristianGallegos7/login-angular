import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'lancelot', // Redirige a 'lancelot' cuando la ruta es vacía
        pathMatch: 'full',
    },
    {
        path: 'lancelot',
        loadComponent: () =>
            import('./layouts/auth-layout/auth-layout.component').then(
                (c) => c.AuthLayoutComponent
            ),
        children: [
            {
                path: 'user',
                children: [
                    {
                        path: 'login',
                        loadComponent: () =>
                            import('./auth/user/login-page/login-page.component').then(
                                (m) => m.LoginPageComponent
                            ),
                    },
                    {
                        path: 'register',
                        loadComponent: () =>
                            import('./auth/user/register-page/register-page.component').then(
                                (m) => m.RegisterPageComponent
                            ),
                    },
                    {
                        path: '**', // Ruta comodín para cualquier otra ruta bajo 'user'
                        redirectTo: 'login', // Redirige a 'login' si no se encuentra la ruta
                    },
                ],
            },
            {
                path: 'company',
                children: [
                    {
                        path: 'login',
                        loadComponent: () =>
                            import('./auth/company/login-page/login-page.component').then(
                                (m) => m.LoginPageComponent
                            ),
                    },
                    {
                        path: 'register',
                        loadComponent: () =>
                            import('./auth/company/register-page/register-page.component').then(
                                (m) => m.RegisterPageComponent
                            ),
                    },
                    {
                        path: '**', // Ruta comodín para cualquier otra ruta bajo 'company'
                        redirectTo: 'login', // Redirige a 'login' si no se encuentra la ruta
                    },
                ],
            },
            {
                path: '**', // Ruta comodín para cualquier otra ruta bajo 'lancelot'
                redirectTo: 'user/login', // Redirige a 'user/login' si no se encuentra la ruta
            },
        ],
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./layouts/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'jobs', // Redirige a 'jobs' si no hay una ruta específica
                pathMatch: 'full',
            },
            {
                path: 'jobs',
                loadComponent: () =>
                    import('./jobs/jobs.component').then((m) => m.JobsComponent),
            },
            {
                path: 'account',
                loadComponent: () =>
                    import('./account/account.component').then((m) => m.AccountComponent),
            },
            {
                path: '**', // Ruta comodín para cualquier otra ruta bajo 'dashboard'
                redirectTo: 'jobs', // Redirige a 'jobs' si no se encuentra la ruta
            },
        ],
    },
    {
        path: '**', // Ruta comodín para cualquier otra ruta no capturada
        redirectTo: 'lancelot/user/login', // Redirige a 'lancelot/user/login' si no se encuentra la ruta
    },
];
