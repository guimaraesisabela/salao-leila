import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
  usuario = { nome: '', email: '', telefone: '', tipo: 'cliente' };
  erro = '';
  carregando = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  entrar() {
    this.erro = '';
    this.carregando = true;
    this.usuarioService.criar(this.usuario).subscribe({
      next: (res) => {
        localStorage.setItem('usuario', JSON.stringify(res));
        this.router.navigate(['/agendamento']);
      },
      error: (err) => {
        this.erro = err.error?.error || 'Erro ao cadastrar. Tente novamente.';
        this.carregando = false;
      }
    });
  }
}