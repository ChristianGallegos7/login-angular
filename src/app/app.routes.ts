import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login', // Redirige a 'auth/login' cuando la ruta es vacía
        pathMatch: 'full',
    },
    {
        path: 'auth',
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
                path: '**', // Ruta comodín para cualquier otra ruta bajo 'auth'
                redirectTo: 'login', // Redirige a 'login' si no se encuentra la ruta
            },
        ],
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./layouts/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
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
        redirectTo: 'auth/login', // Redirige a 'auth/login' si no se encuentra la ruta
    },
];
