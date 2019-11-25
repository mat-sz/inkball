import Matter from 'matter-js';

import { boxWidth } from '../constants';

import Wall from '../drawables/Wall';
import Ball from '../drawables/Ball';
import Goal from '../drawables/Goal';
import { GameState, Color, MapObject } from '../Types';

export default function prepareMap(map: number[][],
    world: Matter.World,
    state: GameState) {

    map.forEach((row, y) => {
        row.forEach((place, x) => {
            switch (place) {
                case MapObject.WALL:
                    state.walls.push(Wall(boxWidth * x, boxWidth * y, Color.ANY));
                    break;
                case MapObject.WALL_GOLD:
                    state.walls.push(Wall(boxWidth * x, boxWidth * y, Color.GOLD));
                    break;
                case MapObject.GOAL_ANY:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.ANY));
                    break;
                case MapObject.GOAL_RED:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.RED));
                    break;
                case MapObject.GOAL_BLUE:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.BLUE));
                    break;
                case MapObject.GOAL_GOLD:
                    state.goals.push(Goal(boxWidth * x, boxWidth * y, Color.GOLD));
                    break;
                case MapObject.BALL_RED:
                    state.balls.push(Ball(boxWidth * x, boxWidth * y, Color.RED));
                    break;
                case MapObject.BALL_BLUE:
                    state.balls.push(Ball(boxWidth * x, boxWidth * y, Color.BLUE));
                    break;
                case MapObject.BALL_GOLD:
                    state.balls.push(Ball(boxWidth * x, boxWidth * y, Color.GOLD));
                    break;
            }
        });
    });
    
    Matter.World.add(world, state.walls.map((box) => box.body));
    Matter.World.add(world, state.goals.map((goal) => goal.body));
    Matter.World.add(world, state.balls.map((ball) => ball.body));
};