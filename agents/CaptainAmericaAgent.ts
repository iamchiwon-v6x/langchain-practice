import { AvengersAnnotationType } from "../state/AvengersState";
import { sleep } from "../utils";

const captainAmericaAgent = async (state: AvengersAnnotationType) => {
  console.log("Captain America is attacking!");
  await sleep(100);
  return {
    ...state,
    enemy: {
      ...state.enemy,
      hp: state.enemy.hp - 2,
    },
  };
};

export default captainAmericaAgent;
