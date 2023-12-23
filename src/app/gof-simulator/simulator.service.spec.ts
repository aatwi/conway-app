import { Cell, DEAD_CELL, LIVE_CELL } from './../model/cell';
import { TestBed } from '@angular/core/testing';

import { SimulatorService } from './simulator.service';

describe('SimulatorService', () => {
  let service: SimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulatorService);
  });


  it('it_should_return_0_when_the_cell_has_no_live_neighbours', () => {
    let world: Cell[][] = [
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(0);
  })

  it('it_should_return_1_when_the_cell_has_1_live_neighbour_at_top_left', () => {
    let world: Cell[][] = [
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(1);
  })


  it('it_should_return_1_when_the_cell_has_1_live_neighbour_at_top_right', () => {
    let world: Cell[][] = [
      [DEAD_CELL, DEAD_CELL, LIVE_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(1);
  })

  it('it_should_return_1_when_the_cell_has_1_live_neighbour_mid_left', () => {
    let world: Cell[][] = [
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(1);
  })

  it('it_should_return_1_when_the_cell_has_1_live_neighbour_mid_right', () => {
    let world: Cell[][] = [
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, LIVE_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(1);
  })


  it('it_should_return_3_when_the_cell_has_3_live_neighbours_in_the_upper_row', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(3);
  })

  it('it_should_return_3_when_the_cell_has_3_live_neighbours_in_the_lower_row', () => {
    let world: Cell[][] = [
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(3);
  })

  it('it_should_return_5_when_the_cell_has_5_live_neighbour_from_top_and_left', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(1, 1)).toEqual(5);
  })

  it('it_should_return_7_when_the_cell_has_7_live_neighbour_from_top_and_right_and_bottom', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
    ];

      service.setGrid(world);
      expect(service.countLiveNeighboursOf(1, 1)).toEqual(7);
  })

  it('it_should_return_8_when_the_cell_has_8_adjacent_live_neighbours', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, DEAD_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
    ];

      service.setGrid(world);
      expect(service.countLiveNeighboursOf(1, 1)).toEqual(8);
  })

  it('it_should_not_count_the_cell_itself', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
    ];

      service.setGrid(world);
      expect(service.countLiveNeighboursOf(1, 1)).toEqual(8);
  })

  it('it_should_not_go_out_of_bound_when_cell_is_at_the_border', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, DEAD_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
    ];

    service.setGrid(world);
    expect(service.countLiveNeighboursOf(0, 0)).toEqual(2);
    expect(service.countLiveNeighboursOf(0, 1)).toEqual(3);
    expect(service.countLiveNeighboursOf(1, 0)).toEqual(4);
    expect(service.countLiveNeighboursOf(1, 2)).toEqual(3);
    expect(service.countLiveNeighboursOf(2, 1)).toEqual(4);
    expect(service.countLiveNeighboursOf(2, 2)).toEqual(2);
  })


  it('under_population_test_a_live_cell_with_less_than_2_live_neighbours_dies', () => {
    let world: Cell[][] = [
      [LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, DEAD_CELL]
    ];

    service.setGrid(world);
    expect(service.getNextCellState(0, 0)).toEqual(DEAD_CELL);
    expect(service.getNextCellState(1, 0)).toEqual(DEAD_CELL);
  })

  it('over_crowding_test_1_a_live_cell_with_more_than_3_live_neighbours_dies', () => {
    let world: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
    ];
    service.setGrid(world);
    expect(service.getNextCellState(1, 0)).toEqual(DEAD_CELL);
  })

  it('a_live_cell_with_2_live_neighbours_stays_alive', () => {
    let world: Cell[][] = [
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, LIVE_CELL, DEAD_CELL],
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
    ];
    service.setGrid(world);
    expect(service.getNextCellState(1, 1)).toEqual(LIVE_CELL);
  })

  it('a_live_cell_with_3_live_neighbours_stays_alive', () => {
    let world: Cell[][] = [
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, LIVE_CELL, DEAD_CELL],
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
    ];
    service.setGrid(world);
    expect(service.getNextCellState(1, 1)).toEqual(LIVE_CELL);
  })

  it('a_dead_cell_with_3_live_neighbours_lives', () => {
    let world: Cell[][] = [
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
    ];
    service.setGrid(world);
    expect(service.getNextCellState(1, 1)).toEqual(LIVE_CELL);
  })

  it('a_dead_cell_with_less_than_3_live_neighbours_stays_dead', () => {
    let world: Cell[][] = [
      [DEAD_CELL, DEAD_CELL, DEAD_CELL],
      [LIVE_CELL, DEAD_CELL, DEAD_CELL],
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
    ];
    service.setGrid(world);
    expect(service.getNextCellState(1, 1)).toEqual(DEAD_CELL);
  })

  it('acceptance_test_a_small_world', () => {
    let startState: Cell[][] = [
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, LIVE_CELL, DEAD_CELL],
      [DEAD_CELL, LIVE_CELL, DEAD_CELL],
    ];

    let nextState: Cell[][] = [
      [LIVE_CELL, LIVE_CELL, DEAD_CELL],
      [LIVE_CELL, LIVE_CELL, LIVE_CELL],
      [LIVE_CELL, LIVE_CELL, DEAD_CELL],
    ];

    service.setGrid(startState);
    expect(service.generateNextState()).toEqual(nextState);
  })

  it('acceptance_test', () => {
      let startState: Cell[][] = [
          [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
          [DEAD_CELL, DEAD_CELL, LIVE_CELL, DEAD_CELL, DEAD_CELL],
          [DEAD_CELL, DEAD_CELL, LIVE_CELL, DEAD_CELL, DEAD_CELL],
          [DEAD_CELL, DEAD_CELL, LIVE_CELL, DEAD_CELL, DEAD_CELL],
          [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      ];
      let nextState: Cell[][] = [
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, LIVE_CELL, LIVE_CELL, LIVE_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
        [DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL, DEAD_CELL],
      ];

      service.setGrid(startState);
      expect(service.generateNextState()).toEqual(nextState);

      service.setGrid(nextState);
      expect(service.generateNextState()).toEqual(startState);
  })
});
