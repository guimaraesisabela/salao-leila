import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicoService {
  private url = 'http://localhost:3000/api/servicos';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(this.url);
  }

  criar(dados: any): Observable<any> {
    return this.http.post(this.url, dados);
  }

  atualizar(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, dados);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}