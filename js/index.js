// import { Grid, Square } from "./functions/grids.js";
import { Autographing } from "./functions/autoGraph.js";

const myAutoGraph = new Autographing("autoGraph");
myAutoGraph.fotoSign("camSign");
myAutoGraph.fotoSign("imgSign");
myAutoGraph.sign();

myAutoGraph.save("saveGraph");

