import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliasRelacionesComponent } from './anomalias-relaciones.component';

describe('AnomaliasRelacionesComponent', () => {
  let component: AnomaliasRelacionesComponent;
  let fixture: ComponentFixture<AnomaliasRelacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomaliasRelacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomaliasRelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
