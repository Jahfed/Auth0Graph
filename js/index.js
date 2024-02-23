// import { Grid, Square } from "./functions/grids.js";
import { Autographing } from "./functions/autoGraph.js";

const myAutoGraph = new Autographing("autoGraph");
myAutoGraph.fotoSign("camSign");

const myAutoGraphNew = new Autographing("autoGraph");
myAutoGraphNew.sign();

myAutoGraph.save("saveGraph");

