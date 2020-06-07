import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesModalPage } from './detalles-modal.page';

describe('DetallesModalPage', () => {
  let component: DetallesModalPage;
  let fixture: ComponentFixture<DetallesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
