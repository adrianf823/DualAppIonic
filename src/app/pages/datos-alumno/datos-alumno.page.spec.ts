import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosAlumnoPage } from './datos-alumno.page';

describe('DatosAlumnoPage', () => {
  let component: DatosAlumnoPage;
  let fixture: ComponentFixture<DatosAlumnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAlumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
