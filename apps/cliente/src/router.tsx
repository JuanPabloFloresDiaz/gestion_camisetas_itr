// src/router.tsx
import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Login  from './pages/Index';
import { RootLayout } from './layout/RootLayout';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Client } from './pages/Client';
import { Order } from './pages/Order';
import { Report } from './pages/Report';
import { Shirt } from './pages/Shirt';
import { Size } from './pages/Size';
import { Typeshirt } from './pages/Typeshirt';

// 1. Ruta raíz: usaremos un layout muy simple (puede ser un fragment o Outlet)
//    para poder tener tanto la ruta de login como la rama /main en el mismo árbol.
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// 2. Ruta de Login (cuando el usuario esté en "/")
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});

// 3. Rama "main" para el área autenticada, usando un layout con sidebar, etc.
const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'main',
  component: RootLayout,
});

// 4. Rutas hijas dentro de la rama "main"
const dashboardRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'dashboard',
  component: Dashboard,
});

const adminRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'admin',
  component: Admin,
});

const clientRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'client',
  component: Client,
});

const orderRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'order',
  component: Order,
});

const reportRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'report',
  component: Report,
});

const shirtRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'shirt',
  component: Shirt,
});

const sizeRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'size',
  component: Size,
});

const typeshirtRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: 'typeshirt',
  component: Typeshirt,
});

// 5. Construir el árbol de rutas
mainRoute.addChildren([
  dashboardRoute,
  adminRoute,
  clientRoute,
  orderRoute,
  reportRoute,
  shirtRoute,
  sizeRoute,
  typeshirtRoute,
]);

// 6. Agregar las ramas al árbol raíz
rootRoute.addChildren([loginRoute, mainRoute]);

// 7. Crear el router
export const router = createRouter({
  routeTree: rootRoute,
});
