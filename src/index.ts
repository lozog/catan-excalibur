import {
    Engine,
    Loader,
    DisplayMode,
    CollisionType,
    Color,
    Input,
} from "excalibur";
import { Tile } from "./actors/tile";
import { ScenarioBuilder } from "./lib/scenariobuilder";
import { Corner } from "./actors/corner";
import { Edge } from "./actors/edge";
// import { Resources } from './resources';

/**
 * Managed game class
 */
class Game extends Engine {
    constructor() {
        super({ displayMode: DisplayMode.FitScreen });
    }
}

const game = new Game();
// const loader = new Loader(Object.values(Resources));
// game.start(loader);
game.start();

const scenarioBuilder = new ScenarioBuilder();

const scenario = scenarioBuilder.getScenario();
console.log(scenario.board);

// TODO: won't need this once camera is implemented
const OFFSET = 300;

const tiles: Tile[] = [];
for (const tile of scenario.board.tiles) {
    tiles.push(
        new Tile(tile.center.x, tile.center.y, scenarioBuilder.getCircumradius(), OFFSET, tile.type)
    );
}

const corners: Corner[] = [];
for (const corner of scenario.board.corners) {
    corners.push(
        new Corner(corner.center.x, corner.center.y, OFFSET)
    );
}

const edges: Edge[] = [];
for (const edge of scenario.board.edges) {
    edges.push(
        new Edge(edge.ends, OFFSET)
    );
}

tiles.forEach(function (tile) {
    // Add the tile to the current scene to be drawn
    game.add(tile);
});

corners.forEach(function (corner) {
    // Add the corner to the current scene to be drawn
    game.add(corner);
});

edges.forEach(function (edge) {
    // Add the edge to the current scene to be drawn
    game.add(edge);
});
