import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../../services/agendamento';
import { ServicoService } from '../../../services/servico';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.html',
  styleUrl: './historico.scss'
})
export class Historico implements OnInit {
  agendamentos: any[] = [];
  servicos: any[] = [];
  erro = '';
  sucesso = '';
  carregando = true;
  cliente: any;

  modalEditarId: string | null = null;
  formularioEdicao = { dataHora: '', servicos: [] as string[], observacao: '' };

  constructor(
    private agendamentoService: AgendamentoService,
    private servicoService: ServicoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (!usuarioSalvo) {
      this.router.navigate(['/cadastro']);
      return;
    }
    this.cliente = JSON.parse(usuarioSalvo);
    this.carregarAgendamentos();
    this.carregarServicos();
  }

  carregarAgendamentos() {
    this.agendamentoService.buscarPorCliente(this.cliente._id).subscribe({
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

  abrirEdicao(ag: any) {
    const agora = new Date();
    const dataAgendamento = new Date(ag.dataHora);
    const diffEmDias = (dataAgendamento.getTime() - agora.getTime()) / (1000 * 60 * 60 * 24);

    if (diffEmDias < 2) {
      this.erro = 'Alterações com menos de 2 dias de antecedência devem ser feitas por telefone.';
      return;
    }

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
    this.agendamentoService.atualizar(this.modalEditarId, this.formularioEdicao, true).subscribe({
      next: (res: any) => {
        const index = this.agendamentos.findIndex((a: any) => a._id === this.modalEditarId);
        if (index !== -1) this.agendamentos[index] = res;
        this.sucesso = 'Agendamento atualizado com sucesso!';
        this.fecharEdicao();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.erro = err.error?.error || 'Erro ao atualizar agendamento.';
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

  voltarParaAgendamento() {
    this.router.navigate(['/agendamento']);
  }
}