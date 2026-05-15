import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },

  // Área do cliente
  { path: 'cadastro', loadComponent: () => import('./pages/cliente/cadastro/cadastro').then(m => m.Cadastro) },
  { path: 'agendamento', loadComponent: () => import('./pages/cliente/agendamento/agendamento').then(m => m.Agendamento) },
  { path: 'historico', loadComponent: () => import('./pages/cliente/historico/historico').then(m => m.Historico) },

  // Área admin
  { path: 'admin/agendamentos', loadComponent: () => import('./pages/admin/agendamentos/agendamentos').then(m => m.Agendamentos) },
  { path: 'admin/servicos', loadComponent: () => import('./pages/admin/servicos/servicos').then(m => m.Servicos) },

  { path: '**', redirectTo: 'cadastro' }
];