import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomaliasIntegridadComponent } from './anomalias-integridad.component';

describe('AnomaliasIntegridadComponent', () => {
  let component: AnomaliasIntegridadComponent;
  let fixture: ComponentFixture<AnomaliasIntegridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnomaliasIntegridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomaliasIntegridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
