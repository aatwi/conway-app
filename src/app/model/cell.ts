
export interface Cell {
  alive: boolean;
}

export const DEAD = false;
export const LIVE = true;

export const DEAD_CELL: Cell = {alive: DEAD};
export const LIVE_CELL: Cell = {alive: LIVE};
