import { createSelector } from "reselect";

// state.directoryをreturnすることで最初のセレクターを実際に作成
const selectDirectory = (state) => {
  console.log(state);
  return state.directory;
};

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
