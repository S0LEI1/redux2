import { createSlice } from "@reduxjs/toolkit";
const items = [];
await fetch('https://656f4eea6529ec1c6237b715.mockapi.io/messages', {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(tasks => {
  tasks.map(task => items.push(task))
}).catch(error => {
  // handle error
})
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    items
  },
  reducers: {
    addMessage: function (state, action) {
      console.log(action);
      state.items.push(action.payload);
    },
    deleteMessage: function (state, action) {
      console.log(action);
      state.items = state.items.filter((item) => item.id != action.payload.id);
    },
    updateMessage: function (state, action) {
      state.items.map((item) => {
        if (item.id == action.payload.id) {
          item.title = action.payload.title;
          item.amount = action.payload.amount;
        }
      });
    },
  },
});
export const { addMessage, deleteMessage, updateMessage } =
  messageSlice.actions;
export const selectedData = (state) => state.message.items;
export default messageSlice.reducer;
