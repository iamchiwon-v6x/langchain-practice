import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { genUUID } from "./utils";

const config = { configurable: { thread_id: genUUID() } };

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await llm.invoke(state.messages);
  return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

const input = [{ role: "user", content: "Hi! I'm Bob" }];
const output = await app.invoke({ messages: input }, config);
console.log(output.messages[output.messages.length - 1]);

const input2 = [{ role: "user", content: "What's my name?" }];
const output2 = await app.invoke({ messages: input2 }, config);
console.log(output2.messages[output2.messages.length - 1]);

// different thread_id
const config2 = { configurable: { thread_id: genUUID() } };
const input3 = [{ role: "user", content: "What's my name?" }];
const output3 = await app.invoke({ messages: input3 }, config2);
console.log(output3.messages[output3.messages.length - 1]);
