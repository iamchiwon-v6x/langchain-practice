import graph from "./graph/MultiAgentGraph";
import { AvengersAnnotationType } from "./state/AvengersState";
import { genUUID, saveGraph } from "./utils";

saveGraph("agent_graph.png", graph);

const initialState: AvengersAnnotationType = {
  enemy: {
    name: "Thanos",
    type: "Monster",
    hp: 30,
  },
  is_defeated: false,
};

const config = {
  configurable: {
    thread_id: genUUID(),
  },
  recursionLimit: 40,
};

const result = await graph.invoke(initialState, config);
console.log(result);
