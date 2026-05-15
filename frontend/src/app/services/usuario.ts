import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private url = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  criar(dados: any): Observable<any> {
    return this.http.post(this.url, dados);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  listar(): Observable<any> {
    return this.http.get(this.url);
  }
}