import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {
  recarga=localStorage.getItem("logeado")
  showFiller = false;
  constructor(public services:ProfesorService, public router:Router,public modalService:NgbModal,private route: ActivatedRoute,public menuCtrl: MenuController) { 
    if(this.recarga=="1"){
      location.reload()
      localStorage.setItem("logeado","0")
    }
    router.events.pipe(
    filter(event => event instanceof NavigationEnd)  
  ).subscribe((event: NavigationEnd) => {
    this.alumnoData=localStorage.getItem("alumnoData")
  });}
  arrayUsuarios:Usuario[]=[];
  arrayProfesores:Usuario[]=[];
  arrayTutores:Usuario[]=[];
  arrayAlumnos:Usuario[]=[];
  alumnoData=localStorage.getItem("alumnoData")
  lugar;
  eleccionCuentas=localStorage.getItem("eleccionCuentas")
  ngOnInit() {
    
    console.log(this.arrayUsuarios)
    if(this.recarga=="1"){
      location.reload()
      localStorage.setItem("logeado","0")
    }
    this.route.params.subscribe(params => {
      console.log(params['id'])
    this.lugar=params['lugar']
    })
    setTimeout(() => {
this.getProfesores()
    }, 200);
  }
  getProfesores(){
    this.arrayProfesores=[]
    this.services.getUsuarios().subscribe(resp=>{
      this.arrayUsuarios=resp;
      this.arrayUsuarios.forEach(element => {
        if(element.Rol=="profesor"){
          this.arrayProfesores.push(element)
        }
      });
    })
      }


      eliminarUsuario(id){

       Swal.fire({
          title: 'Espere',
          text: 'Eliminando cuenta...',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
    
        
        this.services.deleteUsuario(id).subscribe(resp=>{
         
          this.getProfesores()
         
    
       
          
          
        })
    
        Swal.close();
        Swal.fire({
          title: 'Eliminar Usuario',
          text: 'Usuario Eliminado',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

}
