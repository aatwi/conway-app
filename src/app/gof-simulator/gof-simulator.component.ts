import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { BEACON, BLNKER, Cell, LIVE_CELL, PENTA, SIMKIN, TOAD } from '../model/cell';
import { SimulatorService } from './simulator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Observable, Subscription, timer } from 'rxjs';

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
  private static START: string = "Start";
  private static STOP: string = "Stop";

  simulator: SimulatorService = new SimulatorService();
  selectedGrid: Cell[][] | undefined;
  actionDisplayText: string = GofSimulatorComponent.START;
  
  subscription: Subscription | undefined;
  timerObersver: Observable<number> = timer(0, 500);
  
  gridsMap = new Map([
    ["blinker", BLNKER],
    ["toad", TOAD],
    ["beacon", BEACON],
    ["simkin", SIMKIN], 
    ["penta", PENTA]
  ]);


  grids: Grid[] = [
    {value: 'blinker', viewValue: 'Blinker'},
    {value: 'toad', viewValue: 'Toad'},
    {value: 'beacon', viewValue: 'Beacon'},
    {value: 'pulsar', viewValue: 'Pulsar'},
    {value: 'simkin', viewValue: 'Simkin'}, 
    {value: 'penta', viewValue: 'Penta Decathlon'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  isDisabled(): boolean {
    return this.selectedGrid == undefined;
  }

  generateNextState() {
    if(this.actionDisplayText === GofSimulatorComponent.START) {
      this.subscription = this.timerObersver.subscribe(() => {
        this.run();
      })
    }else {
      if(this.subscription != undefined) {
        this.subscription.unsubscribe();
      }
    }
    this.updateActionsDisplayText();
  }

  private run() {
    if(this.selectedGrid != undefined) {
      this.simulator.setGrid(this.selectedGrid);
      this.selectedGrid = this.simulator.generateNextState();
    }
  }

  private updateActionsDisplayText() {
    this.actionDisplayText = this.actionDisplayText === GofSimulatorComponent.START ? GofSimulatorComponent.STOP : GofSimulatorComponent.START;
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
