import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultView: false,
  shrink: false,
  roles: [
    {
      id: 1,
      name: "Super Admin",
      value: "super_admin"
    },
    {
      id: 2,
      name: "Admin",
      value: "admin"
    },
    {
      id: 3,
      name: "Executive Director",
      value: "executive_director"
    },
    {
      id: 4,
      name: "Head of Dept.",
      value: "head_of_department"
    },
    {
      id: 5,
      name: "User /Officer",
      value: "user_officer"
    },
    {
      id: 6,
      name: "Manager ",
      value: "manager "
    },
    {
      id: 7,
      name: "Read Only",
      value: "read_only"
    },
    {
      id: 8,
      name: "Task User",
      value: "task_user"
    }
  ]
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    reset: () => initialState,
    setView: (state, action) => {
      state.defaultView = action.payload;
    },
    setShrink: (state, action) => {
      state.shrink = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(getUsers.fulfilled, (state, action) => {
    //   state.users = action.payload
    // })
  }
});

export const {
  reset,
  setView,
  setShrink
} = generalSlice.actions;

export default generalSlice.reducer;
