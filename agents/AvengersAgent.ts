import { AvengersAnnotationType } from "../state/AvengersState";

export const avengersAgent = async (state: AvengersAnnotationType) => {
  console.log(`${state.enemy.name}의 남은 체력: ${state.enemy.hp}`);

  if (state.enemy.hp <= 0) {
    console.log(`${state.enemy.name}를 물리쳤습니다.`);
    return {
      ...state,
      is_defeated: true,
    };
  }

  return state;
};
