import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';

@Injectable()
export class AppService {

  connection;
  established = false;

  async ejecutarQuery(sql: string): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {});

    if (this.established) {
      console.log('INFO', 'Conexión ya establecida, ejecutando SQL');
      return await this.connection.query(sql);
    } else {
      await this.crearConexion().then(
        async (value) => {
          console.log('INFO:', 'Conexión establecida, ejecutando SQL');
          promise = this.connection.query(sql);
        },
        (reason) => {
          console.log('INFO:', reason);
          promise = new Promise<string> ( resolve => resolve(reason));
        },
      );
      return promise;
    }
  }

  async crearConexion(): Promise<string> {
    if ( this.established ) {
      return new Promise<string>(
        (resolve, reject) => resolve('Conexión creada'),
      );
    } else {
      await createConnection(
        {
          type: 'mssql',
          host: 'localhost',
          port: 1433,
          username: 'sa',
          password: '12345',
          database: 'Orders',
          synchronize: true,
          options: { encrypt: true },
        }).then(
        value => {
          this.connection = value;
          this.established = true;
          console.log('EXITO: ', 'Se crea conexión');
          return new Promise<string> (
            (resolve, reject) => { resolve('Conexión creada'); },
          );
        },
        reason => {
          this.established = false;
          console.log('ERROR', 'No se crea la conexión');
          return new Promise<string>((resolve, reject) => { reject(reason); });
        });
    }
  }

}
