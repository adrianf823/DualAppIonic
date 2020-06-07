import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Usuario } from 'src/app/models/usuario';
import { Ciclo } from 'src/app/models/ciclo';
import { CicloService } from 'src/app/services/ciclo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Modulo } from 'src/app/models/modulo';


@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.page.html',
  styleUrls: ['./ciclos.page.scss'],
})
export class CiclosPage implements OnInit {
  term;term2;term3;
  eleccionCuentas;
ciclosArray:Ciclo[]=[]
modulosArray:Modulo[]=[]
detalles:boolean=false
tareas:boolean=false
usuario:Usuario= JSON.parse(localStorage.getItem("currentUser"));



  constructor(public cicloservice:CicloService, public router:Router,public route:ActivatedRoute,public menuCtrl: MenuController,public alertController: AlertController) { }

    ngOnInit(): void {
     
      this.cicloservice.getCiclos().subscribe(resp=>{
        this.ciclosArray=resp
        this.route.params.subscribe(params => {
          console.log(this.ciclosArray)
          if(params['id']!='0'){
            this.detalles=true
           
          }
         
          this.ciclosArray.forEach(element => {
            if(element.id==params['id']){
              console.log(element.Modulos)
              element.Modulos.forEach(element => {
                console.log(element)
                this.modulosArray.push(element)
              });
            }
          });
        })
      })
     
   
  }

  verModulos(ciclo:Ciclo){
    this.tareas=false
    this.router.navigate(["home/ciclo/",ciclo.id])
  }

  //verTareas(modulo:ModuloModel){
   // this.tareas=true
  //  modulo.tareas.forEach(element => {
   //   console.log(element)
   //   this.tareasArray.push(element)
  //  });
//  }

  async borrarCiclo(ciclo){

  Swal.fire({
    title: 'Eliminar Ciclo',
    text: 'Ciclo Eliminado',
    icon: 'success',
    confirmButtonText: 'OK'
  });





  this.cicloservice.deleteCiclos(ciclo.id).subscribe(resp=>{
    this.cicloservice.getCiclos().subscribe(resp=>{
      this.ciclosArray=resp
      this.route.params.subscribe(params => {
        console.log(params['id'])
        if(params['id']!='0'){
          this.detalles=true
          console.log("entropp")
         
        }
       
     
      })
    })
   
  })
}

}
