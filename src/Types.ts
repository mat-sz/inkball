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