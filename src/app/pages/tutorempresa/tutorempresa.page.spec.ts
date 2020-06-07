import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorempresaPage } from './tutorempresa.page';

describe('TutorempresaPage', () => {
  let component: TutorempresaPage;
  let fixture: ComponentFixture<TutorempresaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorempresaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorempresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
