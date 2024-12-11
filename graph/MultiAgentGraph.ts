import { MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { avengersAgent, whosNext } from "../agents/AvengersAgent";
import captainAmericaAgent from "../agents/CaptainAmericaAgent";
import hulkAgent from "../agents/HulkAgent";
import ironmanAgent from "../agents/IronmanAgent";
import { AvengersAnnotation } from "../state/AvengersState";

const workflow = new StateGraph(AvengersAnnotation);

workflow.addNode("avengers", avengersAgent);
workflow.addNode("hulk", hulkAgent);
workflow.addNode("ironman", ironmanAgent);
workflow.addNode("captainAmerica", captainAmericaAgent);

workflow.addEdge(START, "avengers");

workflow.addConditionalEdges(
  "avengers",
  whosNext.selector,
  whosNext.conditions
);

workflow.addEdge("hulk", "avengers");
workflow.addEdge("ironman", "avengers");
workflow.addEdge("captainAmerica", "avengers");

const config = {
  checkpointer: new MemorySaver(),
};
const graph = workflow.compile(config);

export default graph;
