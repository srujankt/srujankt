import { combineReducers } from "redux";

const intialState = {
  custData: [
    {
      dollar: 0,
      points: 0,
      id: 0,
      name: "",
    },
  ],
  customer: [
    { id: 1, name: "Srujan" },
    { id: 2, name: "Sai Kishor" },
  ],
};

const customers = (state = intialState, action) => {
  debugger;
  switch (action.type) {
    case "Add":
      let item = 0;
      if (state.custData.length === 1) {
        item = state.custData.filter((x) => x.id === 0);
      }
      if (item.length === 1) {
        state = {
          ...state,
          custData: [action.payload],
        };
      } else {
        const data = [
          ...state.custData,
          {
            id: action.payload.id,
            name: action.payload.name,
            dollar: action.payload.dollar,
            points: action.payload.points,
          },
        ];
        state = {
          ...state,
          custData: data,
        };
      }
      break;
    default:
      break;
  }
  return state;
};

const reducer = combineReducers({
  customers,
});
export default reducer;
