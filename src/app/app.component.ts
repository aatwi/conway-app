import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GofSimulatorComponent } from './gof-simulator/gof-simulator.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GofSimulatorComponent, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Conway's Game of Life Simulator";

  onGridChange(sGrid: MatSelectChange) {
    let selectedGrid = sGrid.value;
  }
  onChange($event: MatSelectChange) {
    throw new Error('Method not implemented.');
    }
}
