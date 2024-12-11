import {
  Annotation,
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { genUUID, last } from "./utils";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

const prompt2 = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
  ],
  new MessagesPlaceholder("messages"),
]);

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation<string>(),
});

const callModel4 = async (state: typeof GraphAnnotation.State) => {
  const chain = prompt2.pipe(llm);
  const trimmedMessage = await trimmer.invoke(state.messages);
  const response = await chain.invoke({
    messages: trimmedMessage,
    language: state.language,
  });
  return { messages: [response] };
};

const workflow4 = new StateGraph(GraphAnnotation)
  .addNode("model", callModel4)
  .addEdge(START, "model")
  .addEdge("model", END);

const app4 = workflow4.compile({ checkpointer: new MemorySaver() });

const messages = [
  new SystemMessage("you're a good assistant"),
  new HumanMessage("hi! I'm bob"),
  new AIMessage("hi!"),
  new HumanMessage("I like vanilla ice cream"),
  new AIMessage("nice"),
  new HumanMessage("whats 2 + 2"),
  new AIMessage("4"),
  new HumanMessage("thanks"),
  new AIMessage("no problem!"),
  new HumanMessage("having fun?"),
  new AIMessage("yes!"),
];

const config5 = { configurable: { thread_id: genUUID() } };
const input8 = {
  messages: [...messages, new HumanMessage("What math problem did I ask?")],
  language: "Korean",
};

const output9 = await app4.invoke(input8, config5);
console.log(last(output9.messages));
