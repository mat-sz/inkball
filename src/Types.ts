import Matter from 'matter-js';

export interface Drawable {
    draw: (ctx: CanvasRenderingContext2D) => void,
    body: Matter.Body,
    color?: Color,
};

export interface Segment {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
};

export interface GameState {
    walls: Drawable[],
    goals: Drawable[],
    lines: Drawable[][],
    balls: Drawable[],
};

export enum Color {
    ANY,
    RED,
    BLUE,
    GOLD,
};

export enum MapObject {
    AIR = 0,
    WALL = 1,
    WALL_GOLD = 2,
    GOAL_ANY = 3,
    GOAL_RED = 4,
    GOAL_BLUE = 5,
    GOAL_GOLD = 6,
    BALL_RED = 7,
    BALL_BLUE = 8,
    BALL_GOLD = 9,
};