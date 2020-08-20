import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliasDatosComponent } from './anomalias-datos.component';

describe('AnomaliasDatosComponent', () => {
  let component: AnomaliasDatosComponent;
  let fixture: ComponentFixture<AnomaliasDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomaliasDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomaliasDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
