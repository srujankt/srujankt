import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { render } from "@testing-library/react";
import { CustomerAdd, CustomerList, CustomerUpdate } from "./action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = ({ customerData, customerList, finalCustomerList, dispatch }) => {
  const [id, setId] = useState(0);
  const [dollar, setDollar] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const loadDrp = () => {
    return (
      customerData &&
      customerData.map((item, index) => {
        return <option value={index + 1}>{item.name}</option>;
      })
    );
  };
  const getMonth = (month) => {
    switch (month) {
      case 1:
        return "Jan";
        break;
      case 2:
        return "Feb";
        break;
      case 3:
        return "Mar";
        break;
      case 4:
        return "Apr";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "June";
        break;
      case 7:
        return "July";
        break;
      case 8:
        return "Aug";
        break;
      case 9:
        return "Sept";
        break;
      case 10:
        return "Oct";
        break;
      case 11:
        return "Nov";
        break;
      case 12:
        return "Dec";
        break;
      default:
        break;
    }
  };
  const handleInputChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setDollar(e.target.value);
    }
    return false;
  };

  const handleSave = () => {
    setErrorMsg("");
    const ldollar = parseInt(dollar);
    if (id > 0 && ldollar > 0) {
      let points = 0;
      if (ldollar > 50 && ldollar <= 100) {
        points = 50;
      } else if (ldollar > 50 && ldollar > 100) {
        const val = ldollar - 100;
        const fval = val * 2;
        points = 50 + fval;
      }
      const name = customerData.filter((x) => x.id === id)[0].name;
      const selDate = startDate;
      const currentDate = new Date();
      // To calculate the time difference of two dates
      var Difference_In_Time = currentDate.getTime() - selDate.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      dispatch(
        CustomerAdd({
          id: id,
          dollar: ldollar,
          name: name,
          points: points,
          date: selDate,
          day: selDate.getDay(),
          month: selDate.getMonth() + 1,
          year: selDate.getFullYear(),
          monthinword: getMonth(selDate.getMonth() + 1),
          diffOfDate: Difference_In_Days,
        })
      );
    } else {
      if (id === 0 || ldollar === 0) {
        setErrorMsg("Enter Required Data");
      }
    }
  };
  return (
    <div className="App">
      <div>{errorMsg}</div>
      <div>
        <label for="cars">Choose a Customer:</label>
        <select
          name="customer"
          id="cusomers"
          onChange={(e) => {
            setId(parseInt(e.target.value));
          }}
        >
          <option value={0}>{"Select"}</option>
          {loadDrp(customerData)}
        </select>
      </div>
      <div>
        <label for="cars">Enter a Dollar:</label>
        <input
          type="text"
          style={{ width: "50px" }}
          onChange={handleInputChange}
          value={dollar}
        ></input>
      </div>
      <div>
        <label for="cars">Select Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <button type="button" onClick={handleSave}>
          {"Submit"}
        </button>
      </div>
      <div style={{ marginTop: "50px" }}>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
              {"Name"}
            </div>
            <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
              {"Dollar"}
            </div>
            <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
              {"Points"}
            </div>
            <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
              {"Months"}
            </div>
          </div>
          {finalCustomerList.map((item, index) => (
            <div id={index} style={{ display: "flex" }}>
              <div style={{ paddingLeft: "10px" }}>{item.name}</div>
              <div style={{ paddingLeft: "15px" }}>{item.dollar}</div>
              <div style={{ paddingLeft: "20px" }}>{item.points}</div>
              <div style={{ paddingLeft: "20px" }}>{item.wordInMonths}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customerData: state.customers.customer,
    customerList: state.customers.custData,
    finalCustomerList: state.customers.finalCustData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
