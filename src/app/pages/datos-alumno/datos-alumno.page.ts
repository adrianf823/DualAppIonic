import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MenuController, ModalController } from '@ionic/angular';
import { DetallesModalPage } from 'src/app/modals/detalles-modal/detalles-modal.page';
import Swal from 'sweetalert2';
import { AnadirtareaPage } from 'src/app/modals/anadirtarea/anadirtarea.page';
import { CreardiarioPage } from 'src/app/modals/creardiario/creardiario.page';


@Component({
  selector: 'app-datos-alumno',
  templateUrl: './datos-alumno.page.html',
  styleUrls: ['./datos-alumno.page.scss'],
})
export class DatosAlumnoPage implements OnInit {
  arrayTareasyModulos=[]
  public columns: any;
  public rows =[]
  usuario:Usuario= JSON.parse(localStorage.getItem("currentUser"));
  Plantillaciclo:any
  arrayUsuarios:Usuario[]=[];
  //alumno:Usuario;
  alumno:Usuario= JSON.parse(localStorage.getItem("currentAlumno"));
arrayAlumnos:Usuario[]=[];
alumnos:Usuario[]=[];
arrayDiario;
public columns2: any;
public rows2 =[]

  constructor(private modalController:ModalController,private route: ActivatedRoute,public services:ProfesorService,public modalService:NgbModal,private http: HttpClient,public menuCtrl: MenuController) {this.getAlumnos();
    this.getArrayTareasyModulos();
    this.columns = [
      { name: 'Modulo' },
      { name: 'Descripcion' },
      { name: 'Horas' },
      { name: 'Horas Realizadas' },
      { name: 'Evaluación profesor' },
      { name: 'Evaluación tutor' },
      { name: 'Operaciones' }
    ];
    this.columns2 = [
      { name: 'Fecha'},
      { name: 'Descripcion' },
  
    ];

    

}
  
  

  ngOnInit() {
    this.menuCtrl.toggle('first');
    
   
    this.route.params.subscribe(params => {
      console.log(params['id'])
     
      this.services.getUsuarioPorId(params['id']).subscribe(resp=>{
        if(resp.Diario==undefined){
          this.arrayDiario=[]
        }else{
        this.arrayDiario=resp.Diario
        this.rows2=this.arrayDiario
        console.log('ROWS2'+JSON.stringify(this.rows2))
        }
        console.log(this.rows2)
        setTimeout(() => {
          this.alumno=resp
          var p:any=resp
          Object.defineProperty(p,"id",{value:this.alumno.id})
          console.log(p)
          localStorage.setItem("currentAlumno",JSON.stringify(p))
        this.alumnos.push(resp)
      }, 500);
     
    })
   
  })
 
 

}









  
  getArrayTareasyModulos(){
   Swal.fire({
      title: 'Espere',
      text: 'Puede tardar unos segundos...',
     icon: 'info',
     allowOutsideClick: false
   });
  Swal.showLoading();
    this.route.params.subscribe(params => {
      console.log(params['id'])
      this.arrayTareasyModulos=[]
      console.log(this.arrayTareasyModulos)
      this.getAlumnos()
      console.log(this.arrayAlumnos)
      setTimeout(() => {
        this.arrayAlumnos.forEach(element => {
          if(element.id==params['id']){
            this.alumno=element
            this.Plantillaciclo={}
            this.Plantillaciclo=this.alumno.PlantillaCiclo
            console.log(this.Plantillaciclo)
            this.arrayTareasyModulos=[]
            
            console.log(this.alumno)
  for (let index1 = 0; index1 < this.alumno.PlantillaCiclo.Modulos.length; index1++) {
    for (let index2 = 0; index2 < this.alumno.PlantillaCiclo.Modulos[index1].tareas.length; index2++) {
      var modulo={
        Nombre:this.alumno.PlantillaCiclo.Modulos[index1].Nombre,
        tarea:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Nombre,
        Horas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Horas,
        HorasRealizadas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].HorasRealizadas,
        EvProfesor:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].EvProfesor,
        EvTutor:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].EvTutor
      }      
      if(modulo.HorasRealizadas==undefined){
        modulo.HorasRealizadas=0
      }
      console.log(modulo)
      console.log("pepe")
    
      this.arrayTareasyModulos.push(modulo)
      this.rows = this.arrayTareasyModulos;
      console.log('ROWS '+this.rows)
    }
    
  }
          }

        });
        console.log(this.arrayTareasyModulos)
       Swal.close()
      }, 500);

    });
  }


  getAlumnos(){
    this.services.getUsuarios().subscribe(resp=>{
      this.arrayUsuarios=resp;
      this.arrayUsuarios.forEach(element => {
        var fecha,fecha2;
        if(element.Rol=="alumno"){
          /*fecha=element.FechaCreacion.split("T")
          fecha2=fecha[0].split("-")
          element.FechaCreacion=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0]
          console.log(element.FechaCreacion)*/
          this.arrayAlumnos.push(element)
        }
      });
    })


} 
 openModal(row){

  this.Plantillaciclo.Modulos.forEach(element2 => {
   
    element2.tareas.forEach(async element3 => {
   
      if(row.tarea==element3.Nombre){
      


        const modal = this.modalController.create({
   
          component: DetallesModalPage,
          componentProps: {"data":{
            Nombre:row.Nombre,
            tarea: row.tarea,
            Horas:row.Horas,
            HorasRealizadas:row.HorasRealizadas,
            EvProfesor:row.EvProfesor,
            EvTutor:row.EvTutor,
           
          },
          PlantillaCiclo:this.Plantillaciclo,
          Tarea1:element3,
          id:this.alumno.id,
          modulo:row
        }
      });
      
       
      (await modal).present();
        
}

  });
  
});




}


openTarea(row){

  this.Plantillaciclo.Modulos.forEach(element2 => {
    element2.tareas.forEach(async element3 => {
      if(row.tarea==element3.Nombre){
        console.log('ELEMENT 2 '+element2)
        console.log('ELEMENT 3 '+element3)


        const modal = this.modalController.create({
   
          component: AnadirtareaPage,
          componentProps: {
          PlantillaCiclo:this.Plantillaciclo,
          Tarea1:element3,
          id:this.alumno.id,
          modulo:row
        }
      });
      
       
      (await modal).present();
        
}

  });
  
});




}


  async openDiario(){




        const modal = this.modalController.create({
   
          component: CreardiarioPage,
          componentProps: {
            arrayDiario:this.arrayDiario,
            id:this.alumno.id,
            rows2:this.rows2
          }
        
      });
      
       
      (await modal).present();
        
}

borrarDiario(diario){
 
  console.log(diario)
  this.arrayDiario = this.arrayDiario.filter(function(dato){
    if(dato.Descripcion==diario.Descripcion && dato.Fecha==diario.Fecha){
      return false;
    }else{
        return true;
    }
});
console.log(this.arrayDiario)
var alumno={
Diario:this.arrayDiario
}
this.rows2 = this.arrayDiario
console.log(alumno)
this.services.patchUsuarios(this.alumno.id,alumno).subscribe()
}

}
