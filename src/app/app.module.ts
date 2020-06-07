import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthPage } from './pages/auth/auth.page';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
 
// Mat modules //
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule, MatTab} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table' 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2'
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     NgxDatatableModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule,
     MatCardModule,
     MatTabsModule,
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     MatCheckboxModule,
     MatIconModule,
     MatToolbarModule,
     MatMenuModule,
     MatDividerModule,
     MatTableModule,
     MatSidenavModule,
     MatListModule,
     NgbModule,
  
    
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
