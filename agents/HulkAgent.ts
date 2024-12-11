import { AvengersAnnotationType } from "../state/AvengersState";
import { sleep } from "../utils";

const hulkAgent = async (state: AvengersAnnotationType) => {
  console.log("Hulk is attacking!");
  await sleep(800);
  return {
    ...state,
    enemy: {
      ...state.enemy,
      hp: state.enemy.hp - 5,
    },
  };
};

export default hulkAgent;
