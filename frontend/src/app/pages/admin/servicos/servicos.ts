import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoService } from '../../../services/servico';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicos.html',
  styleUrl: './servicos.scss',
})
export class Servicos implements OnInit {
  servicos: any[] = [];
  carregando = true;
  erro = '';
  sucesso = '';

  formulario = { nome: '', descricao: '', preco: 0, duracaoMinutos: 0 };
  editandoId: string | null = null;
  mostrarFormulario = false;
  modalRemoverId: string | null = null;

  constructor(
    private servicoService: ServicoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicoService.listar().subscribe({
      next: (res: any[]) => {
        this.servicos = res;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao carregar serviços.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  abrirFormulario(servico?: any) {
    if (servico) {
      this.editandoId = servico._id;
      this.formulario = {
        nome: servico.nome,
        descricao: servico.descricao,
        preco: servico.preco,
        duracaoMinutos: servico.duracaoMinutos,
      };
    } else {
      this.editandoId = null;
      this.formulario = { nome: '', descricao: '', preco: 0, duracaoMinutos: 0 };
    }
    this.mostrarFormulario = true;
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
    this.editandoId = null;
  }

  salvar() {
    this.erro = '';
    this.sucesso = '';

    if (this.editandoId) {
      this.servicoService.atualizar(this.editandoId, this.formulario).subscribe({
        next: (res: any) => {
          const index = this.servicos.findIndex((s: any) => s._id === this.editandoId);
          if (index !== -1) this.servicos[index] = res;
          this.sucesso = 'Serviço atualizado com sucesso!';
          this.fecharFormulario();
          this.cdr.detectChanges();
        },
        error: () => (this.erro = 'Erro ao atualizar serviço.'),
      });
    } else {
      this.servicoService.criar(this.formulario).subscribe({
        next: (res: any) => {
          this.servicos.push(res);
          this.sucesso = 'Serviço cadastrado com sucesso!';
          this.fecharFormulario();
          this.cdr.detectChanges();
        },
        error: () => (this.erro = 'Erro ao cadastrar serviço.'),
      });
    }
  }

  remover(id: string) {
    this.modalRemoverId = id;
  }

  confirmarRemocao() {
    if (!this.modalRemoverId) return;
    this.servicoService.remover(this.modalRemoverId).subscribe({
      next: () => {
        this.servicos = this.servicos.filter((s: any) => s._id !== this.modalRemoverId);
        this.sucesso = 'Serviço removido com sucesso!';
        this.modalRemoverId = null;
        this.cdr.detectChanges();
      },
      error: () => (this.erro = 'Erro ao remover serviço.'),
    });
  }

  cancelarRemocao() {
    this.modalRemoverId = null;
  }

  irParaAgendamentos() {
    this.router.navigate(['/admin/agendamentos']);
  }
}
