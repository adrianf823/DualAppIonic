import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {
  term;
  eleccionCuentas;
empresasArray:Empresa[]=[]
empresasArray2:Empresa[]=[]
detalles:boolean=false
tareas:boolean=false
usuario:Usuario= JSON.parse(localStorage.getItem("currentUser"));
  constructor(public empresaservice:EmpresasService, public router:Router,public route:ActivatedRoute,public modalService:NgbModal) { }

    ngOnInit(): void {
    
      console.log('wat?');
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.getEmpresas();
      console.log(this.empresasArray)
      this.route.params.subscribe(params => {
        console.log(params['id'])
        if(params['id']!='0'){
          this.detalles=true
          console.log("entropp")
         
        }

      })
    })
   
  }



  getEmpresas(){
    this.empresasArray=[]
   
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.empresasArray2=resp;
      this.empresasArray2.forEach(element => {
        if(this.usuario.Rol == "tutorempresa"){
          console.log("Soy tutor empresa")
          console.log(element.TutorEmpresa +"  "+ this.usuario.Nombre)
        
        if(element.TutorEmpresa == this.usuario.Nombre+" "+this.usuario.Apellido){
          console.log(this.usuario)
          console.log(element.Nombre +"  "+ this.usuario.Empresa)
          this.empresasArray.push(element)
        }
      }else{
        if(this.usuario.Rol=="profesor"){
          this.empresasArray.push(element)
          console.log("LOL")
        }
      }
      });
    })
 
      }


borrarEmpresa(empresa){
  
  this.empresaservice.deleteEmpresas(empresa.id).subscribe(resp=>{
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.empresasArray=resp
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
