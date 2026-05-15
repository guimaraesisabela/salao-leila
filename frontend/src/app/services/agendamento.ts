import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private url = 'http://localhost:3000/api/agendamentos';

  constructor(private http: HttpClient) {}

  criar(dados: any): Observable<any> {
    return this.http.post(this.url, dados);
  }

  listar(): Observable<any> {
    return this.http.get(this.url);
  }

  buscarPorCliente(clienteId: string): Observable<any> {
    return this.http.get(`${this.url}/cliente/${clienteId}`);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  atualizar(id: string, dados: any, isCliente = false): Observable<any> {
    return this.http.put(`${this.url}/${id}?isCliente=${isCliente}`, dados);
  }
}