import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tarea } from 'src/app/models/tarea';
import { Modulo } from 'src/app/models/modulo';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CicloService } from 'src/app/services/ciclo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-anadirtarea',
  templateUrl: './anadirtarea.page.html',
  styleUrls: ['./anadirtarea.page.scss'],
})
export class AnadirtareaPage implements OnInit {
  g:any= new Date()
  usuario:Usuario=JSON.parse(localStorage.getItem("currentUser"))
  comentario;ext;file;img;nombreIcono;
  p;Coment:boolean;q;
  @Input() public id;
  @Input() public modulo;
  @Input() public detalles;
  @Input() public PlantillaCiclo;
  @Input() public Tarea1;
  HorasRealizadas=0;
  arrayComentarios=[];
  arrayActividades;
  issub:boolean=false;tareaEscrita:boolean=false
  arrayEvaluaciones=[]
  idc=localStorage.getItem("idCicloCreado")
  arrayModulos:Modulo[]=[];
  arrayTareas:Tarea[]=[]
  myForm: FormGroup;  myForm2: FormGroup;
  isSubmitted:boolean=false;
  EvProfesor;EvTutor
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder,public cicloService:CicloService,public services:ProfesorService,public router: Router,private modalController: ModalController) { }

  ngOnInit() {
    this.createForm2()
    this.createForm();
  
    
    console.log(this.id)
    this.getActividades();
    var k=[]
    k=this.PlantillaCiclo.TipoEvaluacion.split(",")
    for (const i of k) {
      this.arrayEvaluaciones.push(i)
    }
  }

  getActividades(){
    this.PlantillaCiclo.Modulos.forEach(element => {
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea1.Nombre){
          setTimeout(() => {
            this.evt.setValue(element2.EvTutor, {
              onlySelf: true
            })
            this.evp.setValue(element2.EvProfesor, {
              onlySelf: true
            })
          }, 400);
          
          if(element2.Comentarios==undefined){
  
          }else{
          element2.Comentarios.forEach(element3 => {
            this.arrayComentarios.push(element3)
          });
        }
          this.arrayActividades=element2.actividades
        }
      
        });
      }
  });
  
  }
  closeModal(){
    this.modalController.dismiss();
  }
get taream() {
  return this.myForm.get('tarea');
}

get evp() {
  return this.myForm2.get('EvProfesor');
}
get evt() {
  return this.myForm2.get('EvTutor');
}
get horasm() {
  return this.myForm.get('Horas');
}

  get formControls(){
    return this.myForm['controls'];
  }


  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Adjunto: [''],
      Autoevaluacion: ['A', [Validators.required]]
    });
  }

  private createForm2() {
  
    this.myForm2 = this.formBuilder.group({
      EvProfesor: '',
      EvTutor: ''
    });
  }

  submitForm(formValue){
    console.log("odiosmio")
    console.log(this.detalles)
if(this.detalles){

}else{


  

  this.PlantillaCiclo.Modulos.forEach(element => {
    console.log(this.modulo.Nombre)
    console.log(element.Nombre)
  if(this.modulo.Nombre==element.Nombre){
    console.log("jode")
    element.tareas.forEach(element2 => {
      console.log(element2)
      console.log(this.Tarea1)
      if(element2.Nombre==this.Tarea1.Nombre){
        console.log("poaentraoloco")
        if(element2.HorasRealizadas==undefined || element2.HorasRealizadas==null){
          element2.HorasRealizadas=0
        }
        var h = element2.HorasRealizadas+formValue.Horas
        if(element2.Horas<formValue.Horas || h>element2.Horas){
          alert("Las horas de la actividad no pueden superar a las del módulo")
        }else{
          Swal.fire({
            title: 'Espere',
            text: 'Subiendo actividad...',
            icon: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();
        element2.HorasRealizadas+=formValue.Horas
        this.nombreIcono=`${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
        this.services.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
          console.log("imagen subida");
          
        
        formValue['Adjunto'] = `https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
        element2.actividades.push(formValue)
        console.log(element2)
        console.log(this.PlantillaCiclo)
        var alumno:Usuario={
          PlantillaCiclo:this.PlantillaCiclo
        }
        console.log(alumno)
        this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
          Swal.close()
         this.closeModal()
        })
      });
    }
      }
      
    });
    
  }
});

}
  }
}
