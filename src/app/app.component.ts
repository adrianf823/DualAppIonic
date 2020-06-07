import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from './models/usuario';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {AuthService} from '../app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { ProfesorService } from './services/profesor.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  tabsPlacement: string = 'bottom';
  tabsLayout: string = 'icon-top';

  arrayUsuarios:Usuario[]=[];
  arrayAlumnos:Usuario[]=[];
  logeado:boolean=false
  usuario:Usuario= JSON.parse(localStorage.getItem("currentUser"));
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authService:AuthService,
    public services:ProfesorService,
    private route: ActivatedRoute
  ) {
    if (!this.platform.is('mobile')) {
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-left';
    }
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      if(localStorage.getItem("currentUser")){
        this.logeado=true
        console.log(this.logeado)
      }
    });
    this.initializeApp();
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params['id'])
  
    })
    setTimeout(() => {
      this.getAlumnos()
    }, 200);
    console.log(this.usuario)
  }
  logOut(){
    this.authService.logoutUser().subscribe()
    this.router.navigateByUrl("/login")
    localStorage.setItem("deslogueado","1")
    localStorage.setItem("logeado","0")
    location.reload()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getAlumnos(){
    this.arrayAlumnos=[]
this.services.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    if(this.usuario.Rol == "tutorempresa"){

    
    if(element.Rol=="alumno" && element.Colaborador==this.usuario.Nombre){
      this.arrayAlumnos.push(element)
    }
  }else{
    if(element.Rol=="alumno"){
      this.arrayAlumnos.push(element)
    }
  }
  });
})
  }

  getUsuario(){
    this.services.getUsuarioPorId(this.usuario.id).subscribe(resp=>{
      this.usuario=resp
      var p:any=resp
      Object.defineProperty(p,"id",{value:this.usuario.id})
      console.log(p)
      localStorage.setItem("currentUser",JSON.stringify(p))
    })
  }
  verEmpresas(){
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("empresas/0")
    
 
  }

  verAlumnos(){
    console.log("VER ALUMNOS")
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("alumnos/0")
    
 
  }


  verProfesores(){
    console.log("VER PROFESORES")
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("profesores/0")
  
  }

  verAlumno(alumno:Usuario){
    console.log("VER ALUMNO LOKO")
    console.log(alumno)
    localStorage.setItem("eleccionCuentas","ninguno")
    localStorage.setItem("alumnoData","1")
    this.router.navigate( ['datos-alumno',alumno.id] );
  }
  
  verTutoresEmpresa(){
    console.log("VER TUTORESEMPRESA")
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("tutorempresa/0")
  
  }
  verCiclos(){
    console.log("VER CICLOS")
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("ciclos/0")
  
  }

  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
