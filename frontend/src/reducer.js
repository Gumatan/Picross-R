const initialState = {
  currentPuzzleData: {
    id: 1,
    name: "Saucisson",
    creator: "Gum",
    height: 10,
    width: 10,
    solutionString:
      "0000111000000101000000010100000010001000001001100001111101000110111100111111111110001000101001010010"
  },
  gameStarted: false,
  tilesState:
    "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  completedPuzzles: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PUZZLE":
      return {
        ...state,
        currentPuzzleData: action.puzzleData
      };
    case "START_GAME":
      return {
        ...state,
        gameStarted: true
      };
    case "UPDATE_TILE":
      let { tilesState } = state;
      tilesState =
        tilesState.substr(0, action.id) +
        action.newStatus +
        tilesState.substr(action.id + 1);
      return {
        ...state,
        tilesState
      };
    case "RESET_GAME":
      return {
        ...state,
        gameStarted: false,
        tilesState: initialState.tilesState
      };
    case "COMPLETED_PUZZLE":
      const { completedPuzzles } = state;
      completedPuzzles.push(state.currentPuzzleData.id);
      return {
        ...state,
        completedPuzzles
      };
    default:
      return state;
  }
};

export default reducer;
