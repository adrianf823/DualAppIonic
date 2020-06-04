import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  usuario:any=0;
  
  //usuario=JSON.parse(localStorage.getItem("currentUser"))
  myForm:FormGroup;


  constructor(private formBuilder: FormBuilder,public authService:AuthService,public router:Router) {
    this.createForm();
  }

  ngOnInit() {
    



    
    if(this.usuario.Rol=="profesor"){
      console.log("LOGEADO COMO PROFESOR")
      //this.router.navigate(['/profesor/ciclo',0]);
      localStorage.setItem("logeado","1")
      }
      if(this.usuario.Rol=="alumno"){
       // alert("Login alumno")
      //  localStorage.setItem("logeado","1")
        }
        if(this.usuario.Rol=="tutorempresa"){
       //   this.router.navigate(['/profesor/alumno',0])
       //   localStorage.setItem("logeado","1")
          }


         
localStorage.setItem("logeado","0")
if(localStorage.getItem("deslogueado")=="1"){
  localStorage.setItem("deslogueado","0")
  location.reload()
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
    console.log("entra");
    return this.authService
      .loginuser(form.email,form.password)
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
          
        
      //  this.router.navigate(['/empresas',0]);
      localStorage.setItem("logeado","1")
        this.usuario=JSON.parse(localStorage.getItem("currentUser"))
       
        
        }
        if(data.user.Rol=="alumno"){
        //  this.router.navigate(['/home/alumno/',data.user.id])
          localStorage.setItem("logeado","1")
         this.usuario=JSON.parse(localStorage.getItem("currentUser"))
          }
          if(data.user.Rol=="tutorempresa"){
        //    this.router.navigate(['/home/empresas',0])
            localStorage.setItem("logeado","1")
          this.usuario=JSON.parse(localStorage.getItem("currentUser"))
            }
      },(error)=>
     
      console.log("ERROR EN EL LOGIN")
      
      );
  }
  
}
