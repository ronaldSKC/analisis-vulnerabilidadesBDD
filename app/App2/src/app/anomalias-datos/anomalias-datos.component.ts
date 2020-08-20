import { Component, OnInit } from '@angular/core';
import {DbConnectionService} from '../db-connection.service';
import {anomalias_constraints, anomalias_relaciones_necesarias, anomalias_relaciones_necesarias2} from '../sql_queries/anomalias-datos';
import {relaciones_necesarias} from '../sql_queries/relaciones-necesarias';
import {relaciones_requiere_integridad_referencial} from '../sql_queries/relaciones-requieren-integridad-referencial';
import {triggers_consulta} from '../sql_queries/triggers';
import {relaciones_necesarias_V2} from '../sql_queries/relaciones-necesarias-v2';
import {AppComponent} from '../app.component';
@Component({
  selector: 'app-anomalias-datos',
  templateUrl: './anomalias-datos.component.html',
  styleUrls: ['./anomalias-datos.component.css']
})
export class AnomaliasDatosComponent implements OnInit {

  cabecerasConstraints = [];
  datosConstraints = [];
  cabecerasAnomaliaDatos = [];
  datosAnomaliaDatos = [];
  cabecerasTriggers = [];
  datosTriggers = [];
  valores = [];
  valores2 = [];
  constraints = [];
  respuesta;
  error;
  complete;
  constructor(private readonly _db_connection: DbConnectionService,
  private readonly _main: AppComponent) {
    
  this._main.titulo==true;
   }

  ngOnInit() {
    this.obtenerAnomaliaConstraints(); 
    this.obtenerAnomaliaDatos(); 
    this.obtenerTriggers();
  }
  // Se realiza una consulta para obtener las columnas POSIBLE INCONSISTENCIA y DESHABILITADO
  obtenerAnomaliaConstraints() {
    this._db_connection.ejecutarSQL(relaciones_requiere_integridad_referencial).subscribe(
      value => {
        this.respuesta = value;
        if (this.respuesta.length !== 0) {
          // Se guarda la respuesta de la base
          this.valores2 = Object.values(this.respuesta);
          // Se llama al método buscarInconsistencias
          this.buscarInconsistencias();
          // Se limpia el arreglo que guarda el nombre de los contraints
          this.constraints = [];
        }
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Peticion Completada';
      }
    );
  }
  buscarInconsistencias() {
    // Se recorre la respuesta de la Base
    for (let i = 0; i < this.valores2.length; i++) {
      // Se verifica la condición: posible_inconsistencia === true && deshabilitado === false
      if (Object.values(this.valores2[i])[6] === true && Object.values(this.valores2[i])[7] === false) {
        // Si algún registro de la base cumple la condición, se guarda el nombre del constraint
        this.constraints.push(Object.values(this.valores2[i])[0]);
      }
    }
    // Luego se recorre el arreglo que tiene el nombre de los constraints que cumplen la condición
    for (let i = 0; i < this.constraints.length; i++) {
      // Se va a realizar una consulta con cada Constraint, usando anomalias_constraints
      this._db_connection.ejecutarSQL(anomalias_constraints(this.constraints[i])).subscribe(
        value => {
          this.respuesta = value;
          if (this.respuesta !== null) {
            this.cabecerasConstraints = Object.keys(this.respuesta[0]);
            this.datosConstraints.push((Object.values(this.respuesta[0])));
          }
        },
        error1 => {
          this.error = error1;
        }
      );
    }
  }
  obtenerAnomaliaDatos() {
    this._db_connection.ejecutarSQL(relaciones_necesarias_V2).subscribe(
      value => {
        this.respuesta = value;
        if (this.respuesta.length !== 0) {
          this.valores = Object.values(this.respuesta);
          this.buscarAnomaliaDatos();
          this.buscarAnomaliaDatos2();
        }
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Peticion Completada';
      }
    );
  }
  buscarAnomaliaDatos() {
    let tablaPadre;
    let columnaPadre;
    let tablaHija;
    let columnaHija;
    for (let i = 0; i < this.valores.length; i++) {
      tablaPadre = Object.values(this.valores[i])[0];
      columnaPadre = Object.values(this.valores[i])[1];
      tablaHija = Object.values(this.valores[i])[2];
      columnaHija = Object.values(this.valores[i])[3];
      const querySQL = anomalias_relaciones_necesarias2(tablaPadre, columnaPadre, tablaHija, columnaHija);
      this._db_connection.ejecutarSQL(querySQL).subscribe(
        value => {
          this.respuesta = value;
          if (this.respuesta.length !== 0) {
            this.cabecerasAnomaliaDatos = Object.keys(this.respuesta[0]);
            this.datosAnomaliaDatos = Object.values(this.respuesta);
          }
        },
        error1 => {
          this.error = error1;
        },
        () => {
          this.complete = 'Peticion completada';
        }
      );
    }
  }
  buscarAnomaliaDatos2() {
    let tablaPadre;
    let columnaPadre;
    let tablaHija;
    let columnaHija;
    for (let i = 0; i < this.valores.length; i++) {
      tablaPadre = Object.values(this.valores[i])[0];
      columnaPadre = Object.values(this.valores[i])[1];
      tablaHija = Object.values(this.valores[i])[2];
      columnaHija = Object.values(this.valores[i])[3];
      const querySQL = anomalias_relaciones_necesarias(tablaPadre, columnaPadre, tablaHija, columnaHija);
      this._db_connection.ejecutarSQL(querySQL).subscribe(
        value => {
          this.respuesta = value;
          if (this.respuesta.length !== 0) {
            this.cabecerasAnomaliaDatos = Object.keys(this.respuesta[0]);
            this.datosAnomaliaDatos = Object.values(this.respuesta);
          }
        },
        error1 => {
          this.error = error1;
        },
        () => {
          this.complete = 'Peticion completada';
        }
      );
    }
  }
  obtenerTriggers() {
    this._db_connection.ejecutarSQL(triggers_consulta).subscribe(
      value => {
        this.respuesta = value;
        if (this.respuesta.length !== 0) {
          this.cabecerasTriggers = Object.keys(this.respuesta[0]);
          this.datosTriggers = Object.values(this.respuesta);
        }
      },
      error1 => {
        this.error = error1;
      },
    );
  }
}
