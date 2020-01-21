const initialState = {
  currentPuzzleData: {
    id: -1,
    name: "Loading",
    creator: "...",
    height: 10,
    width: 10,
    solutionString:
      "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  gameStarted: false,
  tilesState:
    "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  completedPuzzles: [],
  pendingAnims: [],
  showConnectModal: false,
  showRegisterModal: false,
  user: { username: undefined, saveData: undefined, creator: undefined },
  jwt: null
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
      const newtilesState =
        state.tilesState.substr(0, action.id) +
        action.newStatus +
        state.tilesState.substr(action.id + 1);
      return {
        ...state,
        tilesState: newtilesState
      };
    case "RESET_GAME":
      return {
        ...state,
        gameStarted: false,
        tilesState: initialState.tilesState
      };
    case "COMPLETED_PUZZLE":
      if (state.completedPuzzles.includes(state.currentPuzzleData.id))
        return state;
      const newPendingAnims = [...state.pendingAnims];
      newPendingAnims.push(state.currentPuzzleData.id);
      return {
        ...state,
        pendingAnims: newPendingAnims
      };
    case "PLAYED_ANIM":
      return {
        ...state,
        completedPuzzles: [...state.completedPuzzles, action.id],
        pendingAnims: [...state.pendingAnims].filter(e => e !== action.id)
      };
    case "TOGGLE_CONNECT_MODAL":
      return {
        ...state,
        showConnectModal: !state.showConnectModal
      };
    case "TOGGLE_REGISTER_MODAL":
      return {
        ...state,
        showRegisterModal: !state.showRegisterModal
      };
    case "SWITCH_MODAL":
      return {
        ...state,
        showConnectModal: !state.showConnectModal,
        showRegisterModal: !state.showRegisterModal
      };
    case "SAVE_USER_DATA":
      const saveData = JSON.parse(action.value.user.saveData);
      return {
        ...state,
        user: {
          username: action.value.user.username,
          creator: action.value.user.creator ? true : false,
          saveData
        },
        jwt: action.value.token,
        completedPuzzles: saveData
      };
    case "DISCONNECT":
      return {
        ...state,
        user: initialState.user,
        jwt: initialState.jwt,
        completedPuzzles: initialState.completedPuzzles
      };
    default:
      return state;
  }
};

export default reducer;
