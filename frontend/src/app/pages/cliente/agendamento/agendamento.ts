import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../../services/agendamento';
import { ServicoService } from '../../../services/servico';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.scss',
})
export class Agendamento implements OnInit {
  servicos: any[] = [];
  servicosSelecionados: string[] = [];
  dataHora = '';
  observacao = '';
  sugestaoData: string | null = null;
  erro = '';
  sucesso = '';
  carregando = false;
  cliente: any;

  constructor(
    private servicoService: ServicoService,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (!usuarioSalvo) {
      this.router.navigate(['/cadastro']);
      return;
    }
    this.cliente = JSON.parse(usuarioSalvo);
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicoService.listar().subscribe({
      next: (res) => {
        this.servicos = res;
        this.cdr.detectChanges();
      },
      error: () => (this.erro = 'Erro ao carregar serviços.'),
    });
  }

  toggleServico(id: string) {
    const index = this.servicosSelecionados.indexOf(id);
    if (index === -1) {
      this.servicosSelecionados.push(id);
    } else {
      this.servicosSelecionados.splice(index, 1);
    }
  }

  selecionado(id: string): boolean {
    return this.servicosSelecionados.includes(id);
  }

  agendar() {
    this.erro = '';
    this.sucesso = '';
    this.sugestaoData = null;

    if (this.servicosSelecionados.length === 0) {
      this.erro = 'Selecione ao menos um serviço.';
      return;
    }

    if (!this.dataHora) {
      this.erro = 'Selecione uma data e horário.';
      return;
    }

    const dataSelecionada = new Date(this.dataHora);
    const agora = new Date();
    agora.setSeconds(0, 0);

    if (dataSelecionada <= agora) {
      this.erro = 'Selecione uma data futura.';
      return;
    }

    this.carregando = true;

    const dados = {
      cliente: this.cliente._id,
      servicos: this.servicosSelecionados,
      dataHora: this.dataHora,
      observacao: this.observacao,
    };

    this.agendamentoService
      .criar(dados)
      .pipe(
        finalize(() => {
          this.carregando = false;
        }),
      )
      .subscribe({
        next: (res) => {
          console.log('SUCESSO:', res);
          this.sucesso = 'Agendamento realizado com sucesso!';

          if (res.sugestaoData) {
            this.sugestaoData = new Date(res.sugestaoData).toLocaleDateString('pt-BR');
          }

          this.servicosSelecionados = [];
          this.dataHora = '';
          this.observacao = '';
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('ERRO:', err);

          this.erro = err.error?.error || 'Erro ao realizar agendamento.';
        },
      });
  }

  irParaHistorico() {
    this.router.navigate(['/historico']);
  }
}
