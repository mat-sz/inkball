import Matter from 'matter-js';
import { GameState, Color } from '../Types';

let engine: Matter.Engine;
let state: GameState;
let victoryConditionTriggered: () => void;
let defeatConditionTriggered: () => void;
let latestDrawingCollision: () => void;

const collisionEvent = (event: Matter.IEventCollision<Matter.Engine>) => {
    const pairs = event.pairs;

    for (let pair of pairs) {
        const theBall = state.balls.find((ball) => ball.body === pair.bodyA || ball.body === pair.bodyB);

        if (theBall) {
            const theLineIndex = state.lines.findIndex((line) => line.find((segment) => segment.body === pair.bodyA || segment.body === pair.bodyB));
            const theLine = theLineIndex !== -1 ? state.lines[theLineIndex] : null;
            const theGoal = state.goals.find((goal) => goal.body === pair.bodyA || goal.body === pair.bodyB);
            
            if (theLine) {
                if (theLineIndex === state.lines.length - 1)
                    latestDrawingCollision();

                for (let segment of theLine) {
                    Matter.World.remove(engine.world, segment.body);
                }
                
                state.lines = state.lines.filter((line) => line != theLine);
            }

            if (theGoal) {
                if (theGoal.color === Color.ANY || theGoal.color === theBall.color) {
                    Matter.World.remove(engine.world, theBall.body);
                    state.balls = state.balls.filter((ball) => ball !== theBall);
                    if (state.balls.length == 0)
                        victoryConditionTriggered();
                } else {
                    defeatConditionTriggered();
                }
            }
    
            if (state.lines.length === 0) {
                state.lines = [[]];
            }
        }
    }
};

export default function detectCollisions(_engine: Matter.Engine,
    _state: GameState,
    _victoryConditionTriggered: () => void,
    _defeatConditionTriggered: () => void,
    _latestDrawingCollision: () => void) {

    engine = _engine;
    state = _state;
    victoryConditionTriggered = _victoryConditionTriggered;
    defeatConditionTriggered = _defeatConditionTriggered;
    latestDrawingCollision = _latestDrawingCollision;
    Matter.Events.on(engine, 'collisionStart', collisionEvent);
}