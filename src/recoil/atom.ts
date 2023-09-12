import { atom, selector } from "recoil";

export const testState = atom<number>({
  key: "test",
  default: 0,
});

export const getTestState = selector<number>({
  key: "testState",
  get: ({ get }) => {
    return get(testState);
  },
});
