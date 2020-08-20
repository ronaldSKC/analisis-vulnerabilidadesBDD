import { Component } from '@angular/core';
import {DbConnectionService} from './db-connection.service';
import {relaciones_existentes} from './sql_queries/relaciones-existentes';
import {relaciones_requiere_integridad_referencial} from './sql_queries/relaciones-requieren-integridad-referencial';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private readonly _db_connection: DbConnectionService) { }
}
