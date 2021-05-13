import { combineReducers } from "redux";

const intialState = {
  custData: [
    {
      dollar: 0,
      points: 0,
      id: 0,
      name: "",
      date: "",
      day: "",
      month: "",
      year: "",
      monthinword: "",
      diffOfDate: "",
    },
  ],
  finalCustData: [],
  customer: [
    { id: 1, name: "Srujan" },
    { id: 2, name: "Sai Kishore" },
  ],
};

const customers = (state = intialState, action) => {
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
            date: action.payload,
            day: action.payload.day,
            month: action.payload.month,
            year: action.payload.year,
            monthinword: action.payload.monthinword,
            diffOfDate: action.payload.diffOfDate,
          },
        ];
        state = {
          ...state,
          custData: data,
        };
      }
      const ids = [];
      state.custData.map((item, index) => {
        if (ids.filter((x) => x === item.id).length == 0) {
          ids.push(item.id);
        }
      });
      const months = [];
      state.custData.map((item, index) => {
        if (months.filter((x) => x === item.month).length == 0) {
          months.push(item.month);
        }
      });
      const custList = [];
      ids.map((item) => {
        let dollars = 0;
        let point = 0;
        let names = "";
        let sMonth = "";
        months.map((monthitem) => {
          dollars = 0;
          point = 0;
          state.custData
            .filter(
              (x) => x.id === item && x.month === monthitem && x.diffOfDate < 90
            )
            .map((inneritem) => {
              names = inneritem.name;
              dollars = dollars + inneritem.dollar;
              point = point + inneritem.points;
              sMonth = inneritem.monthinword;
            });
          if (names) {
            custList.push({
              name: names,
              dollar: dollars,
              points: point,
              wordInMonths: sMonth,
            });
          }
        });
      });
      state = {
        ...state,
        finalCustData: custList,
      };
      break;
    case "FinalUpdate":
      state = {
        ...state,
        finalCustData: action.payload,
      };
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
