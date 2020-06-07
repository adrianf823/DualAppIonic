import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

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



  constructor(private route: ActivatedRoute,public services:ProfesorService,public modalService:NgbModal,private http: HttpClient,public menuCtrl: MenuController) {this.getAlumnos();
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

}
  
  

  ngOnInit() {
    this.menuCtrl.toggle('first');
    
   
    this.route.params.subscribe(params => {
      console.log(params['id'])
     
      this.services.getUsuarioPorId(params['id']).subscribe(resp=>{
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
  //  Swal.fire({
    //  title: 'Espere',
   //   text: 'Puede tardar unos segundos...',
   //   icon: 'info',
   //   allowOutsideClick: false
  //  });
  //  Swal.showLoading();
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
    }
    
  }
          }

        });
        console.log(this.arrayTareasyModulos)
       // Swal.close()
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






}
