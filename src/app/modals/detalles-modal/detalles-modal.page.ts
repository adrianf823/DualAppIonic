
    import { Component, OnInit ,Input } from '@angular/core';
    import { NavParams, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalles-modal',
  templateUrl: './detalles-modal.page.html',
  styleUrls: ['./detalles-modal.page.scss'],
})
export class DetallesModalPage implements OnInit {

  public columns: any;
  public rows =[]
  arrayComentarios=[];
  arrayActividades;
  usuario:Usuario=JSON.parse(localStorage.getItem("currentUser"))
  @Input() public id;
  @Input() public PlantillaCiclo;
  @Input() public modulo;
  @Input() public Tarea1;
  @Input() data: any;
  arrayEvaluaciones=[]
  myForm: FormGroup;  myForm2: FormGroup;
  constructor(private navParams: NavParams, private modalController: ModalController,private formBuilder: FormBuilder,public services:ProfesorService) {
    console.log(JSON.stringify(navParams.get('data')));
    this.columns = [
      { name: 'Fecha' },
      { name: 'Tarea' },
      { name: 'Horas' },
      { name: 'Autoevaluacion' },
      { name: 'Operaciones' }
    ];
   }
  ngOnInit() {
    this.createForm2()
    this.createForm();
    setTimeout(() => {
      if(this.usuario.Rol=="profesor"){
        (<HTMLInputElement> document.getElementById("evtut")).disabled = true;
     }
      if(this.usuario.Rol=="tutorempresa"){
        (<HTMLInputElement> document.getElementById("evprof")).disabled = true;
      }
    }, 400);
    
    console.log(this.id)

console.log(this.PlantillaCiclo)
    this.getActividades();
    var k=[]
    k=this.PlantillaCiclo.TipoEvaluacion.split(",")
    for (const i of k) {
      this.arrayEvaluaciones.push(i)
    }
    console.log(this.arrayEvaluaciones)
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
          this.rows = this.arrayActividades;
        }
      
        });
      }
  });
  
  }

  cambiarEvaluacion(e) {
    console.log(e.target.value)
  }
  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Adjunto: ['', [Validators.required]],
      Autoevaluacion: ['A', [Validators.required]]
    });
  }
 

  private createForm2() {
  
    this.myForm2 = this.formBuilder.group({
      EvProfesor: '',
      EvTutor: ''
    });
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

  closeModal(){
    this.modalController.dismiss();
  }




  aplicarEvaluacion(formValue){

    Swal.fire({
      title: 'Espere',
      text: 'Subiendo nota...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
  
    this.PlantillaCiclo.Modulos.forEach(element => {
      console.log(this.modulo.Nombre)
      console.log(element.Nombre)
    if(this.modulo.Nombre==element.Nombre){
      console.log("jode")
      element.tareas.forEach(element2 => {
        console.log(element2)
        console.log(this.Tarea1)
        if(element2.Nombre==this.Tarea1.Nombre){
          if(this.usuario.Rol=="profesor"){
          element2.EvProfesor=formValue.EvProfesor
          }
          if(this.usuario.Rol=="tutorempresa"){
          element2.EvTutor=formValue.EvTutor
          }
          var alumno={
            PlantillaCiclo:this.PlantillaCiclo
          }
          this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
            Swal.close();
            Swal.fire({
               title: 'Subida nota',
               text: 'Nota subida',
               icon: 'success',
               confirmButtonText: 'OK'
             });
          
            
          })
        }
      })
    }
  })
  }


}
