import { createSlice } from "@reduxjs/toolkit";
import { server } from "./../../config";

const initialState = [];

const eventReducers = createSlice({
  name: "EVENT",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      fetch(`${server}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      }).catch((err) => {
        alert("Oops, something wrong happened, please try again");
        console.log("Error in adding new event: " + err);
        return;
      });

      state.push(action.payload);
      return state;
    },
    updateEvent: (state, action) => {
      fetch(`${server}/events/${action.payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      }).catch((err) => {
        alert("Oops, something wrong happened, please try again");
        console.log("Error in updating the event: " + err);
      });

      return state.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            label: action.payload.label,
            status: action.payload.status,
            date: action.payload.date,
          };
        }
        return event;
      });
    },
    deleteEvent: (state, action) => {
      fetch(`${server}/events/${action.payload.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      }).catch((err) => {
        alert("Oops, something wrong happened, please try again");
        console.log("Error in deleting the event: " + err);
      });
      return state.filter((event) => event.id !== action.payload.id);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventReducers.actions;
export const reducer = eventReducers.reducer;
