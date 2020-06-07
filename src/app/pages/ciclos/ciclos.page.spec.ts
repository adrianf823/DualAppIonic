import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CiclosPage } from './ciclos.page';

describe('CiclosPage', () => {
  let component: CiclosPage;
  let fixture: ComponentFixture<CiclosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiclosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CiclosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
