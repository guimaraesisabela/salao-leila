import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../../services/agendamento';
import { ServicoService } from '../../../services/servico';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.html',
  styleUrl: './agendamentos.scss'
})
export class Agendamentos implements OnInit {
  agendamentos: any[] = [];
  servicos: any[] = [];
  carregando = true;
  erro = '';
  sucesso = '';

  modalEditarId: string | null = null;
  formularioEdicao = { dataHora: '', servicos: [] as string[], observacao: '' };

  constructor(
    private agendamentoService: AgendamentoService,
    private servicoService: ServicoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarAgendamentos();
    this.carregarServicos();
  }

  carregarAgendamentos() {
    this.agendamentoService.listar().subscribe({
      next: (res: any[]) => {
        this.agendamentos = res;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao carregar agendamentos.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  carregarServicos() {
    this.servicoService.listar().subscribe({
      next: (res: any[]) => {
        this.servicos = res;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  atualizarStatus(id: string, status: string) {
    this.agendamentoService.atualizar(id, { status }).subscribe({
      next: (res: any) => {
        const index = this.agendamentos.findIndex((a: any) => a._id === id);
        if (index !== -1) {
          this.agendamentos[index] = res;
          this.cdr.detectChanges();
        }
      },
      error: () => this.erro = 'Erro ao atualizar status.'
    });
  }

  abrirEdicao(ag: any) {
    this.modalEditarId = ag._id;
    this.formularioEdicao = {
      dataHora: new Date(ag.dataHora).toISOString().slice(0, 16),
      servicos: ag.servicos.map((s: any) => s._id),
      observacao: ag.observacao || ''
    };
    this.cdr.detectChanges();
  }

  fecharEdicao() {
    this.modalEditarId = null;
  }

  toggleServico(id: string) {
    const index = this.formularioEdicao.servicos.indexOf(id);
    if (index === -1) {
      this.formularioEdicao.servicos.push(id);
    } else {
      this.formularioEdicao.servicos.splice(index, 1);
    }
  }

  servicoSelecionado(id: string): boolean {
    return this.formularioEdicao.servicos.includes(id);
  }

  salvarEdicao() {
    if (!this.modalEditarId) return;
    this.agendamentoService.atualizar(this.modalEditarId, this.formularioEdicao).subscribe({
      next: (res: any) => {
        const index = this.agendamentos.findIndex((a: any) => a._id === this.modalEditarId);
        if (index !== -1) this.agendamentos[index] = res;
        this.sucesso = 'Agendamento atualizado com sucesso!';
        this.fecharEdicao();
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao atualizar agendamento.';
        this.fecharEdicao();
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    const classes: any = {
      pendente: 'status-pendente',
      confirmado: 'status-confirmado',
      cancelado: 'status-cancelado',
      concluido: 'status-concluido'
    };
    return classes[status] || '';
  }

  irParaServicos() {
    this.router.navigate(['/admin/servicos']);
  }
}