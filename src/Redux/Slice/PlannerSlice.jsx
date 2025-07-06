import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  bgImage: null, // ← NEW
};

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    // ---------------- todo reducers ----------------
    addItem: {
      prepare(text) {
        return { payload: { id: nanoid(), text, completed: false } };
      },
      reducer(state, action) {
        state.todoList.push(action.payload);
      },
    },
    removeItem: (state, action) => {
      state.todoList.splice(action.payload, 1);
    },
    editItem: (state, action) => {
      const { index, value } = action.payload;
      state.todoList[index].text = value;
    },
    toggleComplete: (state, action) => {
      const idx = action.payload;
      state.todoList[idx].completed = !state.todoList[idx].completed;
    },

    // ---------------- background‑image reducers ----
    setBackground: (state, action) => {
      state.bgImage = action.payload; // payload = data‑URL string
    },
    clearBackground: (state) => {
      state.bgImage = null;
    },

    logout: (state) => {
      state.todoList = [];
      state.bgImage = null;
    },
  },
});

export const {
  addItem,
  removeItem,
  editItem,
  toggleComplete,
  setBackground,
  clearBackground,
  logout,
} = plannerSlice.actions;

export default plannerSlice.reducer;
