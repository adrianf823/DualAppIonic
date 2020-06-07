import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  usuario:any=0;
  
  //usuario=JSON.parse(localStorage.getItem("currentUser"))
  myForm:FormGroup;


  constructor(private formBuilder: FormBuilder,public authService:AuthService,public router:Router,public alertController: AlertController) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.usuario)
    if(this.usuario == null){
      console.log(this.usuario)
     
      
    }else{

    this.usuario=JSON.parse(localStorage.getItem("currentUser"))
    if(this.usuario == null){

    }else{
    console.log(this.usuario)
    console.log('ENTRALOKOOOOOSODASODAOSODAODASDSAODOAAAAAAAAAAAAAAAAAAAA')

   
    if(this.usuario.Rol=="profesor"){
      console.log("LOGEADO COMO PROFESOR")
   
      this.router.navigate(['/empresas',0]);
      localStorage.setItem("logeado","1")
      }
      if(this.usuario.Rol=="alumno"){
        console.log("LOGEADO COMO ALUMNO")
        
        this.router.navigate(['/datos-alumno',this.usuario.id]);
        localStorage.setItem("logeado","1")
        
        }
        if(this.usuario.Rol=="tutorempresa"){
          console.log("LOGEADO COMO TUTOR")
          
          this.router.navigate(['/empresas',0]);
          localStorage.setItem("logeado","1")
          }


         
localStorage.setItem("logeado","0")
if(localStorage.getItem("deslogueado")=="1"){
  localStorage.setItem("deslogueado","0")
  location.reload()
}
}
}

  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private createForm() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(form) {
    var email=form.email
    var password=form.password
    console.log("entra");
    return this.authService
      .loginuser(email,password)
      .subscribe(
      data => {
        console.log(data)
        this.authService.setUser(data.user);
        const token = data.id;
        this.authService.setId(data.user.id)
        this.authService.setToken(token);
        console.log(data.user.Rol)
        if(data.user.Rol=="profesor"){

          console.log("LOGEA COMO PROFESOR")
        this.router.navigate(['/empresas',0]);
        localStorage.setItem("logeado","1")
        this.usuario=JSON.parse(localStorage.getItem("currentUser"))
        }
        if(data.user.Rol=="alumno"){
          this.router.navigate(['/datos-alumno',this.usuario.id]);
          localStorage.setItem("logeado","1")
         this.usuario=JSON.parse(localStorage.getItem("currentUser"))
          }
          if(data.user.Rol=="tutorempresa"){
            this.router.navigate(['/empresas',0]);
            localStorage.setItem("logeado","1")
          this.usuario=JSON.parse(localStorage.getItem("currentUser"))
            }
            location.reload()
      },async (error)=>{
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'ERROR LOGIN',
          message: 'Email/Contraseña incorrectos.',
          buttons: ['OK']
        });
        await alert.present();
      }
     
   
      
      );
  }
  
}
