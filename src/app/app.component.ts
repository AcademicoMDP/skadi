import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  skadi = new Date('2020-11-16 18:10:00:00');
  skadiNextSpawn: Date = new Date();
  bron = new Date('2020-11-16 18:50:00:00');
  bronNextSpawn: Date = new Date();
  timeTo: any;
  diasLst: any[] = [];
  diasBronLst: any[] = [];

  constructor() {}

  addMinutes(date: Date, m: number): Date {
    const newDateObj = new Date(date.getTime() + m * 60000);
    return newDateObj;
  }

  nextSpawn(who: string): any {
    let newSpawn;
    if (who === 'skadi') {
      for (let i = 0; i < this.diasLst.length; i++) {
        if (+this.diasLst[i] - +new Date() > 0) {
          newSpawn = this.diasLst[i];
          i = this.diasLst.length;
        }
      }
    } else if (who === 'bron') {
      for (let i = 0; i < this.diasBronLst.length; i++) {
        if (+this.diasBronLst[i] - +new Date() > 0) {
          newSpawn = this.diasBronLst[i];
          i = this.diasBronLst.length;
        }
      }
    }
    return newSpawn;
  }

  crearDias(fecha: Date): any[] {
    const dias = [];
    for (let i = 0; i <= 42; i++) {
      fecha = this.addMinutes(fecha, 200);
      dias.push(fecha);
    }
    return dias;
  }

  ngOnInit(): any {
    this.diasLst = this.crearDias(this.skadi);
    this.diasBronLst = this.crearDias(this.bron);
    this.skadiNextSpawn = this.nextSpawn('skadi');
    this.bronNextSpawn = this.nextSpawn('bron');

    setTimeout(() => {
      const secondsSkadi = Math.abs(-this.skadiNextSpawn - -new Date()) / 1000;
      const secondsBron = Math.abs(-this.bronNextSpawn - -new Date()) / 1000;
      this.timeTo = {
        skadi: secondsSkadi,
        bron: secondsBron
      };
    }, 0);
  }

  ngOnDestroy(): any {}

}
