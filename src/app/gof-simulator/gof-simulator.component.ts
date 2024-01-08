import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { BEACON, BLNKER, Cell, LIVE_CELL, SIMKIN, TOAD } from '../model/cell';
import { SimulatorService } from './simulator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

interface Grid {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gof-simulator',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './gof-simulator.component.html',
  styleUrl: './gof-simulator.component.css',
  providers: []
})
export class GofSimulatorComponent  {
  simulator: SimulatorService = new SimulatorService();
  selectedGrid: Cell[][] | undefined;

  gridsMap = new Map([
    ["blinker", BLNKER],
    ["toad", TOAD],
    ["beacon", BEACON],
    ["simkin", SIMKIN]
  ]);


  grids: Grid[] = [
    {value: 'blinker', viewValue: 'Blinker'},
    {value: 'toad', viewValue: 'Toad'},
    {value: 'beacon', viewValue: 'Beacon'},
    {value: 'pulsar', viewValue: 'Pulsar'},
    {value: 'simkin', viewValue: 'Simkin'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  generateNextState() {
    if(this.selectedGrid != undefined) {
      this.simulator.setGrid(this.selectedGrid);
      this.selectedGrid = this.simulator.generateNextState();
    }
  }

  getColor(cell: Cell) {
    return cell === LIVE_CELL ? 'black' : 'white';
  }

  onChange($event: MatSelectChange) {
    this.selectedGrid = this.gridsMap.get($event.value)
  }

  getColumn() {
    return this.selectedGrid?.length;
  }
}
