import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private ingresosEgresosService: IngresoEgresoService) {}

  ngOnInit(): void {
    this.ingresosEgresosService.initIngresoEgresoListener();
  }
}
