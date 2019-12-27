const initialState = {
  currentPuzzleData: {
    id: 1,
    name: "Saucisson",
    creator: "Gum",
    size: { x: 10, y: 10 },
    solutionTab: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
    ]
  },
  tilesState: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PUZZLE":
      return {
        ...state,
        currentPuzzleData: action.puzzleData
      };
    case "UPDATE_TILE":
      const { tilesState } = state;
      tilesState[action.id] = action.newState;
      return {
        ...state,
        tilesState
      };
    default:
      return state;
  }
};

export default reducer;
