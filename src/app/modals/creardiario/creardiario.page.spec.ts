import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreardiarioPage } from './creardiario.page';

describe('CreardiarioPage', () => {
  let component: CreardiarioPage;
  let fixture: ComponentFixture<CreardiarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreardiarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreardiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
