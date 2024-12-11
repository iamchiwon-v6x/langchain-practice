import { AvengersAnnotationType } from "../state/AvengersState";
import { sleep } from "../utils";

const ironmanAgent = async (state: AvengersAnnotationType) => {
  console.log("Ironman is attacking!");
  await sleep(300);
  return {
    ...state,
    enemy: {
      ...state.enemy,
      hp: state.enemy.hp - 3,
    },
  };
};

export default ironmanAgent;
