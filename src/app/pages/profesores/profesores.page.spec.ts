import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfesoresPage } from './profesores.page';

describe('ProfesoresPage', () => {
  let component: ProfesoresPage;
  let fixture: ComponentFixture<ProfesoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
