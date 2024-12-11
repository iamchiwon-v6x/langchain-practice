import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ model: "gpt-4" });
const parser = new StringOutputParser();
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "Translate the following into {language}:"],
  ["user", "{text}"],
]);

const llmChain = promptTemplate.pipe(model).pipe(parser);

const result = await llmChain.invoke({
  language: "korean",
  text: "hi",
});

console.log(result);
