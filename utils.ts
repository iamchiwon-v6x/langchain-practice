import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function genUUID() {
  return uuidv4();
}

export async function saveGraph(
  filename: string,
  agent: { getGraph: () => any }
) {
  const graph = agent.getGraph();
  const image = await graph.drawMermaidPng();
  const arrayBuffer = await image.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);

  const savePath = path.join(__dirname, filename);
  fs.writeFileSync(savePath, data);

  return savePath;
}
