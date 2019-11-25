import Matter from 'matter-js';

import { boxWidth } from '../constants';

import Wall from '../drawables/Wall';
import Ball from '../drawables/Ball';
import Goal from '../drawables/Goal';
import { GameState } from '../Types';

export default function prepareMap(map: number[][],
    world: Matter.World,
    state: GameState) {

    map.forEach((row, y) => {
        row.forEach((place, x) => {
            switch (place) {
                case 1:
                    state.walls.push(Wall(boxWidth * x, boxWidth * y));
                    break;
                case 2:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y));
                    break;
            }
        });
    });
    
    Matter.World.add(world, state.walls.map((box) => box.body));
    Matter.World.add(world, state.goals.map((goal) => goal.body));
    
    state.balls.push(Ball(160, 70));
    Matter.World.add(world, state.balls.map((ball) => ball.body));
};