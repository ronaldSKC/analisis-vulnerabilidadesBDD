import { Component, OnInit } from '@angular/core';
import {DbConnectionService} from '../db-connection.service';

import {
  creacion_auditoria,
  espec_audit_bd,
  habilitacion_auditoria,
  log_auditoria,
  prefijo_archivo_log
} from '../sql_queries/habilitacion-auditoria';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logDeshabilitado = true;
  respuesta;
  error;
  prefijo;
  cabeceras = [];
  datos = [];

  constructor(
    private readonly dbConnection: DbConnectionService
  ) { }

  ngOnInit() {
  }

  generarLog() {
    this.dbConnection.ejecutarSQL(prefijo_archivo_log).subscribe(
      value => {
        this.respuesta = value;
        this.prefijo = this.respuesta[0].log_file_name;
        this.prefijo = this.prefijo.split('.')[0] + '*.' + this.prefijo.split('.')[1];
        console.log(this.prefijo);
        this.dbConnection.ejecutarSQL(log_auditoria(this.prefijo)).subscribe(
          value1 => {
            this.respuesta = value1;
            this.cabeceras = Object.keys(this.respuesta[0]);
            this.datos = Object.values(this.respuesta);
            console.log(this.respuesta);
          },
          error2 => {
            this.error = error2;
          }
        );
      },
      error1 => {
        this.error = error1;
      }
    );

  }


  habilitarAuditoria() {
    if (this.logDeshabilitado) {
      this.dbConnection.ejecutarSQL(creacion_auditoria).subscribe(
        value => {
          this.dbConnection.ejecutarSQL(habilitacion_auditoria).subscribe(
            value1 => {
              this.dbConnection.ejecutarSQL(espec_audit_bd).subscribe(
                value2 => {
                  this.logDeshabilitado = false;
                }
              );
            }
          );
        }
      );
    } else {
      console.log('Auditoría habilitada!');
    }
  }

}
