import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  alumnos: Usuario[];
  
  readonly URL_API = 'https://dualapi.herokuapp.com/api/Usuarios';

  constructor(private http: HttpClient) {

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  getUsuarios() {
    return this.http.get<[]>(this.URL_API);
  }

  deleteUsuario(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
  patchUsuarios(id,usuarios: Usuario) {
    const usuarioTemp = {
      ...usuarios
    };
  
    delete usuarioTemp.id;
    return this.http.patch(this.URL_API + `/${id}`, usuarioTemp);
  }

  getUsuarioPorId(id) {
    return this.http.get<Usuario>(`${this.URL_API}/${id}`);
  }

  changePassword(oldPassword,newPassword){
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `https://dualapi.herokuapp.com/api/Usuarios/change-password?access_token=${accessToken}`;
    return this.http.post<Usuario>(url_api, {oldPassword,newPassword})
  }

  uploadImages(img:any,name){
    return this.http.post(`https://dualapi.herokuapp.com/api/containers/FileUpload`,{file:img,name:name})
  }

}
