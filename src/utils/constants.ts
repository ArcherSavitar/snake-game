// Game configuration constants
export const GAME_CONFIG = {
  // Grid configuration
  DEFAULT_COLS: 20,
  DEFAULT_ROWS: 20,
  MIN_COLS: 8,
  MIN_ROWS: 8,
  CELL_SIZE: 20,

  // Speed configuration (ms per move)
  INITIAL_SPEED: 120,
  MIN_SPEED: 60,
  SPEED_DECREASE: 4,

  // Score configuration
  FOOD_SCORE: 10,

  // Colors
  COLORS: {
    BACKGROUND: 0x1a1a2e,
    GRID_LINE: 0x16213e,
    SNAKE_HEAD: 0x2ecc71,
    SNAKE_BODY: 0x27ae60,
    FOOD: 0xe74c3c,
    UI_PRIMARY: 0x2d7ef7,
    TEXT: '#eeeeee'
  }
} as const;

export type Direction = { x: number; y: number };
export type Position = { x: number; y: number };
export type GameState = 'initial' | 'ready' | 'running' | 'paused' | 'gameover';

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
} as const;
