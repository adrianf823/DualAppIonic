import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  id;
  userLS:Usuario= JSON.parse(localStorage.getItem("currentUser"))
  usuario:Usuario= JSON.parse(localStorage.getItem("currentUser"))
  localstorage = JSON.parse(localStorage.getItem("currentUser"));
  constructor(public service:ProfesorService,public modalService:NgbModal) { }

  ngOnInit() {
    this.id=this.usuario.id
    this.getUsuario()
    console.log(this.localstorage.email);
    (<HTMLInputElement> document.getElementById("NombreLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("ApellidoLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("EmailLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("TelefonoLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputDireccion")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputCiudad")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputProvincia")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputCodigopostal")).disabled = true;
  }



  getUsuario(){
    this.service.getUsuarioPorId(this.id).subscribe(resp=>{
      this.usuario=resp
      var p:any=resp
      Object.defineProperty(p,"id",{value:this.id})
      console.log(p)
      localStorage.setItem("currentUser",JSON.stringify(p))
    })
  }
}
