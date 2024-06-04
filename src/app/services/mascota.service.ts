import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { enviroment } from '../../environments/environment';
import { Mascota } from '../models/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private listChange = new Subject<Mascota[]>();

  constructor(private httpClient: HttpClient) {}

  create(data: Mascota) {
    return this.httpClient.post<Mascota>(`${enviroment.baseURL}/mascota`, data);
  }

  update(data: Mascota){
    return this.httpClient.put<Mascota>(`${enviroment.baseURL}/mascota`, data);
  }

  delete(id: number){
    return this.httpClient.delete<Mascota>(`${enviroment.baseURL}/mascota/${id}`);
  }

  list(){
    return this.httpClient.get<Mascota[]>(`${enviroment.baseURL}/mascotas`)
  }

  setList(newList: Mascota[]){
    this.listChange.next(newList);
  }

  getList(){
    return this.listChange.asObservable();
  }

  serachById(id: number){
    return this.httpClient.get<Mascota>(`${enviroment.baseURL}/mascota/${id}`)
  }
}
