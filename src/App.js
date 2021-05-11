import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { render } from "@testing-library/react";
import { CustomerAdd, CustomerList } from "./action";

class App extends React.Component {
  state = {
    id: 0,
    dollar: 0,
    points: 0,
    errorMessage: "",
  };
  loadDrp = (customerData) => {
    return customerData.map((item, index) => {
      return <option value={index + 1}>{item.name}</option>;
    });
  };
  render() {
    const { customerData } = this.props;
    const handleOnchange = (e) => {
      this.setState({ id: e.target.value });
    };

    const handleInputChange = (e) => {
      debugger;
      const re = /^[0-9\b]+$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        this.setState({ dollar: e.target.value });
      }
      return false;
    };

    const handleSave = () => {
      this.setState({errorMessage: ""})
      if (this.state.id > 0 && this.state.dollar > 0) {
        const dollar = parseInt(this.state.dollar);
        let points = 0;
        if (dollar > 50 && dollar <= 100) {
          points = 50;
        } else if (dollar > 50 && dollar > 100) {
          const val = dollar - 100;
          const fval = val * 2;
          points = 50 + fval;
        }
        const name = this.props.customerData.filter(
          (x) => x.id === parseInt(this.state.id)
        )[0].name;
        this.props.dispatch(
          CustomerAdd({
            id: parseInt(this.state.id),
            dollar: parseInt(this.state.dollar),
            name: name,
            points: points,
          })
        );
      } else {
        if (this.state.id === 0 || this.state.dollar === 0) {
          this.setState({
            errorMessage: "Enter Required Data"
          });
        } 
      }
    };

    const getData = () => {
      const { customerList } = this.props;
      const data = customerList.filter((x) => x.id === 0);
      if (data.length !== 1) {
        const ids = [];
        customerList.map((item, index) => {
          if (ids.filter((x) => x === index).length == 0) ids.push(item.id);
        });
        return ids.map((item) => {
          let dollars = 0;
          let points = 0;
          let name = "";
          customerList
            .filter((x) => x.id === item)
            .map((item) => {
              name = item.name;
              dollars = dollars + item.dollar;
              points = points + item.points;
            });
          return (
            <div style={{ display: "flex" }}>
              <div style={{ paddingLeft: "10px" }}>{name}</div>
              <div style={{ paddingLeft: "15px" }}>{dollars}</div>
              <div style={{ paddingLeft: "20px" }}>{points}</div>
            </div>
          );
        });
      } else {
        return "";
      }
    };

    return (
      <div className="App">
        <div>
          {this.state.errorMessage}
        </div>
        <div>
          <label for="cars">Choose a Customer:</label>
          <select name="customer" id="cusomers" onChange={handleOnchange}>
            <option value={0}>{"Select"}</option>
            {this.loadDrp(customerData)}
          </select>
        </div>
        <div>
          <label for="cars">Enter a Dollar:</label>
          <input
            type="text"
            style={{ width: "50px" }}
            onChange={handleInputChange}
            value={this.state.dollar}
          ></input>
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
            </div>
            {getData()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customerData: state.customers.customer,
    customerList: state.customers.custData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
