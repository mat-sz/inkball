import Matter from 'matter-js';

import { boxWidth } from '../constants';

import Wall from '../drawables/Wall';
import Ball from '../drawables/Ball';
import Goal from '../drawables/Goal';
import { GameState, Color, MapObject } from '../Types';

export default function prepareMap(map: number[][],
    world: Matter.World,
    state: GameState) {
    
    // Find largest rectangles that can be added, merge and add them.
    // Severe code duplication ahead, this will be dealt with later,
    // performance is still much better than before.
    let remainingWalls: number[][] = new Array(map[0].length).fill(MapObject.AIR).map(() => new Array(map.length).fill(MapObject.AIR));

    map.forEach((row, y) => {
        let length = 0;
        let start = 0;
        let last = row[0];
        let tempRow = [...row, 0];

        tempRow.forEach((place, x) => {
            if (last !== place) {
                if (length > 1) {
                    switch (last) {
                        case MapObject.WALL:
                            state.walls.push(Wall(boxWidth * start, boxWidth * y, Color.ANY, length));
                            break;
                        case MapObject.WALL_GOLD:
                            state.walls.push(Wall(boxWidth * start, boxWidth * y, Color.GOLD, length));
                            break;
                    }
                } else {
                    remainingWalls[x - 1][y] = last;
                }

                start = x;
                length = 0;
            }

            length++;
            last = place;
        });
    });

    remainingWalls.forEach((row, x) => {
        let length = 0;
        let start = 0;
        let last = row[0];

        row.forEach((place, y) => {
            if (last !== place) {
                switch (last) {
                    case MapObject.WALL:
                        state.walls.push(Wall(boxWidth * x, boxWidth * start, Color.ANY, 1, length));
                        break;
                    case MapObject.WALL_GOLD:
                        state.walls.push(Wall(boxWidth * x, boxWidth * start, Color.GOLD, 1, length));
                        break;
                }

                start = y;
                length = 0;
            }

            length++;
            last = place;
        });
    });

    map.forEach((row, y) => {
        row.forEach((place, x) => {
            switch (place) {
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