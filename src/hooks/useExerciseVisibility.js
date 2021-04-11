import { useCallback, useReducer } from "react";

function visibilityReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_README_VISIBITY":
      if (state.isReadmeVisible && !state.isSandboxVisible) return state;
      return { ...state, isReadmeVisible: action.payload };
    case "TOGGLE_SANDBOX_VISIBITY":
      if (!state.isReadmeVisible && state.isSandboxVisible) return state;
      return { ...state, isSandboxVisible: action.payload };
    default:
      return state;
  }
}

function useExerciseVisibility() {
  const [{ isReadmeVisible, isSandboxVisible }, dispatch] = useReducer(
    visibilityReducer,
    {
      isReadmeVisible: true,
      isSandboxVisible: true,
    }
  );

  const toggleReadmeVisibility = useCallback(isVisible => {
    dispatch({ type: "TOGGLE_README_VISIBITY", payload: isVisible });
  }, []);

  const toggleSandboxVisibility = useCallback(isVisible => {
    dispatch({ type: "TOGGLE_SANDBOX_VISIBITY", payload: isVisible });
  }, []);

  return {
    isReadmeVisible,
    isSandboxVisible,
    toggleReadmeVisibility,
    toggleSandboxVisibility,
  };
}

export default useExerciseVisibility;
