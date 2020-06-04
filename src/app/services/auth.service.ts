import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { Usuario } from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htttp: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });


  registerUser(usuario:Usuario) {
    const url_api = "https://dualapi.herokuapp.com/api/Usuarios";
    return this.htttp
      .post<Usuario>(
        url_api,
        usuario,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  loginuser(email: string, password: string): Observable<any> {
    const url_api = "https://dualapi.herokuapp.com/api/Usuarios/login?include=user";
    return this.htttp
      .post<Usuario>(
        url_api,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setUser(user: Usuario): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setId(id): void {
    localStorage.setItem("idUser", id);
  }

  setToken(token): void {
    console.log("ENTRO AL TOKEN LOKOOO")
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): Usuario {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: Usuario = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `https://dualapi.herokuapp.com/api/Usuarios/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    console.log("jsndsj")
    localStorage.removeItem("currentUser");
    localStorage.removeItem("idUser");
    localStorage.removeItem("auxUserN");
    localStorage.removeItem("auxUserEm");
    return this.htttp.post<Usuario>(url_api, { headers: this.headers });
  }


}
