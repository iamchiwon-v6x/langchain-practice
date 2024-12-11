import { Annotation } from "@langchain/langgraph";

export const Enemy = Annotation.Root({
  name: Annotation<string>,
  type: Annotation<string>,
  hp: Annotation<number>,
});

export type EnemyType = typeof Enemy.State;

export const AvengersAnnotation = Annotation.Root({
  enemy: Annotation<EnemyType>,
  is_defeated: Annotation<boolean>,
});

export type AvengersAnnotationType = typeof AvengersAnnotation.State;
