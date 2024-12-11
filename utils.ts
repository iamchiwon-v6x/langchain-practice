import { v4 as uuidv4 } from "uuid";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function genUUID() {
  return uuidv4();
}

export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}
