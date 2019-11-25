import Matter from 'matter-js';

import { boxWidth } from '../constants';

import Wall from '../drawables/Wall';
import Ball from '../drawables/Ball';
import Goal from '../drawables/Goal';
import { GameState, Color } from '../Types';

export default function prepareMap(map: number[][],
    world: Matter.World,
    state: GameState) {

    map.forEach((row, y) => {
        row.forEach((place, x) => {
            switch (place) {
                case 1:
                    state.walls.push(Wall(boxWidth * x, boxWidth * y, Color.ANY));
                    break;
                case 2:
                    state.walls.push(Wall(boxWidth * x, boxWidth * y, Color.GOLD));
                    break;
                case 3:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.ANY));
                    break;
                case 4:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.RED));
                    break;
                case 5:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.BLUE));
                    break;
                case 5:
                    // Goals for gold balls?
                    break;
                case 7:
                    state.balls.push(Ball(boxWidth * x, boxWidth * y, Color.RED));
                    break;
                case 8:
                    state.balls.push(Ball(boxWidth * x, boxWidth * y, Color.BLUE));
                    break;
                case 9:
                    // Gold balls?
                    break;
            }
        });
    });
    
    Matter.World.add(world, state.walls.map((box) => box.body));
    Matter.World.add(world, state.goals.map((goal) => goal.body));
    Matter.World.add(world, state.balls.map((ball) => ball.body));
};