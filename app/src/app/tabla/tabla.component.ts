import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit, OnChanges {

  @Input() cabeceras;
  @Input() datos;
  valor = [];
  atributos = [];
  constructor() { }

  ngOnInit() {}

  recorrerAtributos() {
    for (let i = 0; i < this.datos.length; i++) {
      const obj = this.datos[i];
      const keys = Object.keys(this.datos[i]);
      for (let j = 0; j < keys.length; j++) {
        this.valor.push(obj[keys[j]]);
      }
      this.atributos.push(this.valor);
      this.valor = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.atributos = [];
    this.recorrerAtributos();
  }
}
