import { Component, OnInit } from '@angular/core';
import {relaciones_requiere_integridad_referencial} from '../sql_queries/relaciones-requieren-integridad-referencial';
import {relaciones_existentes} from '../sql_queries/relaciones-existentes';
import {DbConnectionService} from '../db-connection.service';
import {AppComponent} from '../app.component';
import {tabla_suelta_v2} from '../sql_queries/tabla_suelta_v2';
import {relaciones_necesarias_V2} from '../sql_queries/relaciones-necesarias-v2';

@Component({
  selector: 'app-anomalias-relaciones',
  templateUrl: './anomalias-relaciones.component.html',
  styleUrls: ['./anomalias-relaciones.component.css']
})
export class AnomaliasRelacionesComponent implements OnInit {
  cabecerasRE = [];
  cabecerasIR = [];
  cabecerasTS = [];
  cabecerasDE = [];
  datosRE = [];
  datosIR = [];
  datosTS = [];
  datosDE = [];
  respuesta;
  error;
  complete;
  hideme= true ;
  hideme1= true ;
  constructor( private readonly _db_connection: DbConnectionService,
  private readonly _main: AppComponent) { 
    this._main.titulo==true;
  }

  ngOnInit() {
    this._main.titulo==true;
    console.log(this._main.titulo);
    this.obtenerRelacionesExistentes();
    this.obtenerRelacionesRequierenIR(); 
    this.obtenerTablasSuletas(); 
    this.obtenerRelacionesDeberianExistir()
  }
  obtenerRelacionesExistentes() {
    this._db_connection.ejecutarSQL(relaciones_existentes).subscribe(
      value => {
        this.respuesta = value;
        if (this.respuesta !== null) {
          this.cabecerasRE = Object.keys(this.respuesta[0]);
          this.datosRE = Object.values(this.respuesta);
        }
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Petición completada';
      }
    );
  }
  obtenerRelacionesRequierenIR() {
    this._main.titulo = false;
    this._db_connection.ejecutarSQL(relaciones_requiere_integridad_referencial).subscribe(
      value => {
        this.respuesta = value;
        if (this.respuesta !== null) {
          this.cabecerasIR = Object.keys(this.respuesta[0]);
          this.datosIR = Object.values(this.respuesta);
        }
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Petición completada';
      }
    );
  }
  obtenerTablasSuletas() {
    this._db_connection.ejecutarSQL(tabla_suelta_v2).subscribe(
      value => {
        this.respuesta = value;
        // console.log(this.respuesta);
        if (this.respuesta !== null) {
          this.cabecerasTS = Object.keys(this.respuesta[0]);
          this.datosTS = Object.values(this.respuesta);
        }
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Petición completada';
      }
    );
  }
  obtenerRelacionesDeberianExistir() {
    this._db_connection.ejecutarSQL(relaciones_necesarias_V2).subscribe(
      value => {
        this.respuesta = value;
        if (this.respuesta !== null) {
          this.cabecerasDE = Object.keys(this.respuesta[0]);
          this.datosDE = Object.values(this.respuesta);
          console.log(this.respuesta);
        }
      },
      error1 => {
        this.error = error1;
      }
    );
  }

}
