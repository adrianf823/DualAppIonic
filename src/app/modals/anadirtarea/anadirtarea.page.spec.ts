import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnadirtareaPage } from './anadirtarea.page';

describe('AnadirtareaPage', () => {
  let component: AnadirtareaPage;
  let fixture: ComponentFixture<AnadirtareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirtareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirtareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
