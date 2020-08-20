import { Component, OnInit } from '@angular/core';
import {anomalias_constraints} from '../sql_queries/anomalias-datos';
import {DbConnectionService} from '../db-connection.service';
import {anomalias_integridad} from '../sql_queries/anomalias-integridad';

@Component({
  selector: 'app-anomalias-integridad',
  templateUrl: './anomalias-integridad.component.html',
  styleUrls: ['./anomalias-integridad.component.css']
})
export class AnomaliasIntegridadComponent implements OnInit {
  cabeceras = [];
  datos = [];
  respuesta;
  error;
  complete;

  constructor(private readonly _db_connection: DbConnectionService) { }

  ngOnInit() {
  }
  obtenerAnomaliaIR() {
    this._db_connection.ejecutarSQL(anomalias_integridad).subscribe(
      value => {
        this.respuesta = value;
        this.cabeceras = Object.keys(this.respuesta[0]);
        this.datos = Object.values(this.respuesta);
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Peticion Completada';
      }
    );
  }

}
