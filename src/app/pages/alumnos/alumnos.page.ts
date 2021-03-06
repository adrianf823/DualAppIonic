import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuController, AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  recarga=localStorage.getItem("logeado")
  showFiller = false;
  constructor(public services:ProfesorService, public router:Router,public modalService:NgbModal,private route: ActivatedRoute,public menuCtrl: MenuController,public alertController: AlertController) { 
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
  

    if(this.recarga=="1"){
      location.reload()
      localStorage.setItem("logeado","0")
    }
    this.route.params.subscribe(params => {
      console.log(params['id'])
    this.lugar=params['lugar']
    })
    setTimeout(() => {
     
      this.getAlumnos()
      
    }, 500);


  }

  getAlumnos(){
    this.arrayAlumnos=[]
this.services.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    if(element.Rol=="alumno"){
      this.arrayAlumnos.push(element)
    }
  });
})
  }
  

  verAlumno(alumno:Usuario){
    this.router.navigate( ['/home/alumno/',alumno.id] );
    localStorage.setItem("alumnoData","1")
    this.alumnoData=localStorage.getItem("alumnoData")
    console.log(this.alumnoData)
  }

  eliminarUsuario(id){

    Swal.fire({
      title: 'Eliminar Usuario',
      text: 'Usuario Eliminado',
       icon: 'success',
      confirmButtonText: 'OK'
    });

    
    this.services.deleteUsuario(id).subscribe(resp=>{
      this.getAlumnos()
  
     
    })

  
  
  }
  

}

