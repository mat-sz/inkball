import Matter from 'matter-js';
import { GameState } from '../Types';

let engine: Matter.Engine;
let state: GameState;
let winConditionTriggered: () => void;

const collisionEvent = (event: Matter.IEventCollision<Matter.Engine>) => {
    const pairs = event.pairs;

    for (let pair of pairs) {
        const theBall = state.balls.find((ball) => ball.body === pair.bodyA || ball.body === pair.bodyB);

        if (theBall) {
            const theLine = state.lines.find((line) => line.find((segment) => segment.body === pair.bodyA || segment.body === pair.bodyB));
            const theGoal = state.goals.find((goal) => goal.body === pair.bodyA || goal.body === pair.bodyB);
            
            if (theLine) {
                for (let segment of theLine) {
                    Matter.World.remove(engine.world, segment.body);
                }
                state.lines = state.lines.filter((line) => line != theLine);
            }

            if (theGoal) {
                Matter.World.remove(engine.world, theBall.body);
                state.balls = state.balls.filter((ball) => ball !== theBall);
                if (state.balls.length == 0) {
                    winConditionTriggered();
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
    _winConditionTriggered: () => void) {

    engine = _engine;
    state = _state;
    winConditionTriggered = _winConditionTriggered;
    Matter.Events.on(engine, 'collisionStart', collisionEvent);
}