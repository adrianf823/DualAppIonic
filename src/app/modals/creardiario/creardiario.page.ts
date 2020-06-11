
  import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  import { finalize } from "rxjs/operators";
  import Swal from 'sweetalert2';
  import { Usuario } from 'src/app/models/usuario';
  import { ProfesorService } from 'src/app/services/profesor.service';
  import { AuthService } from 'src/app/services/auth.service';
  import { CicloService } from 'src/app/services/ciclo.service';
  import { error } from 'protractor';
  import { create } from 'domain';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-creardiario',
  templateUrl: './creardiario.page.html',
  styleUrls: ['./creardiario.page.scss'],
})
export class CreardiarioPage implements OnInit {
  alumno:Usuario=JSON.parse(localStorage.getItem("currentAlumno"))
  usuario: Usuario;
  myForm: FormGroup;
  isSubmitted:boolean=false;
  @Input() public arrayDiario;
  @Input() public id; 
  @Input() public rows2; 
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: ProfesorService,
   public authservice:AuthService,
   public cicloservice:CicloService,
   private modalController: ModalController
  ) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
this.createForm()
    
  }
  
  closeModal(){
    this.modalController.dismiss();
  }

  private createForm() {

    this.myForm = this.formBuilder.group({
      Fecha: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
    });
  }

get formControls(){
  return this.myForm['controls'];
}
submitForm(formValue)
{
  
  this.isSubmitted=true
  var array=[]
  array=this.arrayDiario
  array.push(formValue)
  console.log('array'+array)
    if(this.myForm.valid){
      var alumno={
        Diario:array
      }
      
      console.log(this.arrayDiario)
this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
  this.rows2 = this.arrayDiario
this.closeModal()
location.reload()
})
}
}
}

