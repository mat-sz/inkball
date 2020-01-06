import { MapObject } from "../Types";

export const MAP_SIZE = 20;

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomBool() {
    return Math.random() > 0.5;
}

function addWall(map: number[][], x: number, y: number, vertical: boolean, length: number) {
    if (vertical) {
        for (let i = y; i < y + length; i++) {
            map[i][x] = MapObject.WALL;
        }
    } else {
        for (let i = x; i < x + length; i++) {
            map[y][i] = MapObject.WALL;
        }
    }
}

// Extremely awful code ahead.
// TODO: rewrite.
export default function generateMap(difficulty: number, forcedWallMode?: number) {
    let map: number[][] = [];

    // Create the map array with walls.
    for (let y = 0; y < MAP_SIZE; y++) {
        map[y] = new Array(MAP_SIZE).fill(0);

        for (let x = 0; x < MAP_SIZE; x++) {
            if (x === 0 || x === MAP_SIZE - 1 ||
                y === 0 || y === MAP_SIZE - 1) {
                    map[y][x] = MapObject.WALL;
            }
        }
    }

    const wallMode: number = typeof forcedWallMode !== 'undefined' ? forcedWallMode : random(0, 4);

    switch (difficulty) {
        case 1:
            switch (wallMode) {
                case 0:
                    addWall(map, 6, 4, true, 5);
                    addWall(map, 13, 4, true, 5);
                    addWall(map, 6, 11, true, 5);
                    addWall(map, 13, 11, true, 5);
                    break;
                case 1:
                    addWall(map, 6, randomBool() ? 4 : 0, true, 5);
                    addWall(map, 6, 11, true, 5);
                    addWall(map, 13, randomBool() ? 7 : 4, true, 6);
                    addWall(map, 13, 4, false, 6);
                    addWall(map, 13, 15, false, 6);
                    break;
                case 2:
                    addWall(map, 6, randomBool() ? 4 : 1, true, 15);
                    addWall(map, 13, randomBool() ? 4 : 1, true, 15);
                    break;
                case 3:
                    addWall(map, randomBool() ? 4 : 1, 6, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 13, false, 15);
                    break;
                case 4:
                    addWall(map, randomBool() ? 4 : 1, 5, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 10, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 14, false, 15);
                    break;
            }

            if (wallMode < 3) {
                map[random(1, MAP_SIZE-2)][random(1, 5)] = MapObject.BALL_RED;
                map[random(6, MAP_SIZE-7)][random(MAP_SIZE-6, MAP_SIZE-2)] = MapObject.GOAL_ANY;
            } else {
                map[random(1, 4)][random(1, MAP_SIZE-2)] = MapObject.BALL_RED;
                map[random(MAP_SIZE-4, MAP_SIZE-3)][random(1, MAP_SIZE-2)] = MapObject.GOAL_ANY;
            }
            break;
        case 2:
            switch (wallMode) {
                case 0:
                    addWall(map, 6, 1, true, 7);
                    addWall(map, 6, 12, true, 7);

                    addWall(map, 13, 4, true, 5);
                    addWall(map, 13, 8, false, 5);
                    addWall(map, 13, 11, true, 5);
                    addWall(map, 13, 11, false, 5);
                    break;
                case 1:
                    addWall(map, 6, 1, true, 7);
                    addWall(map, 6, 12, true, 7);

                    if (randomBool()) {
                        addWall(map, 6, 12, false, 7);
                    }

                    if (randomBool()) {
                        addWall(map, 1, 10, false, 4);
                    }
                    
                    addWall(map, 13, randomBool() ? 7 : 4, true, 6);
                    addWall(map, 13, 4, false, 6);
                    addWall(map, 13, 15, false, 6);
                    break;
                case 2:
                    addWall(map, 6, randomBool() ? 4 : 1, true, 15);
                    addWall(map, 13, randomBool() ? 4 : 1, true, 15);
                    addWall(map, 9, 4, false, 2);
                    addWall(map, 9, 15, false, 2);
                    break;
                case 3:
                    addWall(map, randomBool() ? 4 : 1, 6, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 13, false, 15);

                    addWall(map, 5, randomBool() ? 4 : 1, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 4 : 1, true, 2);

                    addWall(map, 5, randomBool() ? 7 : 11, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 7 : 11, true, 2);

                    addWall(map, 5, randomBool() ? 14 : 17, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 14 : 17, true, 2);
                    break;
                case 4:
                    addWall(map, randomBool() ? 4 : 1, 5, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 10, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 14, false, 15);

                    addWall(map, 5, randomBool() ? 3 : 1, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 3 : 1, true, 2);

                    addWall(map, 5, randomBool() ? 6 : 8, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 6 : 8, true, 2);

                    addWall(map, 5, randomBool() ? 14 : 17, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 14 : 17, true, 2);
                    break;
            }

            if (wallMode < 3) {
                map[random(1, MAP_SIZE-2)][random(1, 5)] = MapObject.BALL_RED;
                map[random(1, MAP_SIZE-2)][random(1, 5)] = MapObject.BALL_BLUE;
                map[random(6, MAP_SIZE-7)][random(MAP_SIZE-6, MAP_SIZE-2)] = MapObject.GOAL_ANY;
            } else {
                map[random(1, 4)][random(1, MAP_SIZE-2)] = MapObject.BALL_RED;
                map[random(1, 4)][random(1, MAP_SIZE-2)] = MapObject.BALL_BLUE;
                map[random(MAP_SIZE-4, MAP_SIZE-3)][random(1, MAP_SIZE-2)] = MapObject.GOAL_ANY;
            }
            break;
        case 3:
            switch (wallMode) {
                case 0:
                    addWall(map, 6, 1, true, 7);
                    addWall(map, 6, 12, true, 7);

                    addWall(map, 13, 4, true, 5);
                    addWall(map, 13, 8, false, 5);
                    addWall(map, 13, 11, true, 5);
                    addWall(map, 13, 11, false, 5);
                    break;
                case 1:
                    addWall(map, 6, 1, true, 7);
                    addWall(map, 6, 12, true, 7);

                    if (randomBool()) {
                        addWall(map, 6, 12, false, 7);
                    }

                    if (randomBool()) {
                        addWall(map, 1, 10, false, 4);
                    }
                    
                    addWall(map, 13, randomBool() ? 7 : 4, true, 6);
                    addWall(map, 13, 4, false, 6);
                    addWall(map, 13, 15, false, 6);
                    break;
                case 2:
                    addWall(map, 6, randomBool() ? 4 : 1, true, 15);
                    addWall(map, 13, randomBool() ? 4 : 1, true, 15);
                    addWall(map, 9, 4, false, 2);
                    addWall(map, 9, 15, false, 2);
                    break;
                case 3:
                    addWall(map, randomBool() ? 4 : 1, 6, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 13, false, 15);

                    addWall(map, 5, randomBool() ? 4 : 1, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 4 : 1, true, 2);

                    addWall(map, 5, randomBool() ? 7 : 11, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 7 : 11, true, 2);

                    addWall(map, 5, randomBool() ? 14 : 17, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 14 : 17, true, 2);
                    break;
                case 4:
                    addWall(map, randomBool() ? 4 : 1, 5, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 10, false, 15);
                    addWall(map, randomBool() ? 4 : 1, 14, false, 15);

                    addWall(map, 5, randomBool() ? 3 : 1, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 3 : 1, true, 2);

                    addWall(map, 5, randomBool() ? 6 : 8, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 6 : 8, true, 2);

                    addWall(map, 5, randomBool() ? 14 : 17, true, 2);
                    addWall(map, randomBool() ? 15 : 14, randomBool() ? 14 : 17, true, 2);
                    break;
            }

            if (wallMode < 3) {
                map[random(1, MAP_SIZE-2)][random(1, 5)] = MapObject.BALL_RED;
                map[random(1, MAP_SIZE-2)][random(1, 5)] = MapObject.BALL_BLUE;
                map[random(6, 10)][random(MAP_SIZE-6, MAP_SIZE-2)] = MapObject.GOAL_BLUE;
                map[random(12, MAP_SIZE-7)][random(MAP_SIZE-6, MAP_SIZE-2)] = MapObject.GOAL_RED;
            } else {
                map[random(1, 4)][random(1, MAP_SIZE-2)] = MapObject.BALL_RED;
                map[random(1, 4)][random(1, MAP_SIZE-2)] = MapObject.BALL_BLUE;
                map[random(MAP_SIZE-4, MAP_SIZE-3)][random(1, 9)] = MapObject.GOAL_BLUE;
                map[random(MAP_SIZE-4, MAP_SIZE-3)][random(10, MAP_SIZE-2)] = MapObject.GOAL_RED;
            }
            break;
    }

    return map;
}