import React, { useState } from "react";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import moment from "moment";
import "./App.css";
import { frontEndActions } from "./reducers/reducer";

const LabelStyled = styled.label`
  width: 200px;
  padding: 10px;
`;

const DivStyled = styled.div`
  padding: 10px;
`;
const selectList = list => {
  if (list) {
    const optionList = list.map(element => {
      return <MenuItem value={element}>{element}</MenuItem>;
    });
    return optionList;
  } else {
    return null;
  }
};

const ProfitTable = props => {
  if (Object.keys(props.profitObjectSelCurrency).length !== 0) {
    const profitObject = props.profitObjectSelCurrency[props.currencyKey];
    return (
      <table align={"center"}>
        <thead>
          <tr>
            <td colSpan="2">{moment(props.profitDate).format("DD-MMM-YY")}</td>
          </tr>
          <tr>
            <td colSpan="2">{props.currencyKey}</td>
          </tr>
          <tr>
            <td>Buy</td>
            <td>Sell</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${profitObject.Buy.price}</td>
            <td>${profitObject.Sell.price}</td>
          </tr>
          <tr>
            <td>{moment(profitObject.Buy.time, "HHmm").format("hh:mm A")}</td>
            <td>{moment(profitObject.Sell.time, "HHmm").format("hh:mm A")}</td>
          </tr>
          <tr>
            <td colSpan="2">Profit: ${profitObject.profit.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return null;
  }
};

function App(props) {
  const [isSubmit, setSubmit] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.getData({ currency: props.currency, profitDate: props.profitDate });
    setSubmit(true);
  };
  const currSelectHandleChange = event => {
    props.setCurrency(event.target.value);
    setSubmit(true);
  };
  const dateSelectHandleChange = event => {
    props.setCurrency("");
    props.setDate(event.target.value);
    setSubmit(true);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <DivStyled>
          <LabelStyled>Date</LabelStyled>
          <Select
            value={props.profitDate}
            onChange={dateSelectHandleChange}
            labelWidth={100}
            variant={"outlined"}
            style={{ width: "200px" }}
          >
            {selectList(props.profitDateList)}
          </Select>
        </DivStyled>

        <DivStyled>
          <LabelStyled>Currency</LabelStyled>
          <Select
            value={props.currency}
            onChange={currSelectHandleChange}
            variant={"outlined"}
            style={{ width: "200px" }}
          >
            {selectList(props.currencyList)}
          </Select>
        </DivStyled>
      </form>

      {isSubmit && props.profitObjectSelCurrency
        ? Object.keys(props.profitObjectSelCurrency).map(currencyKey => {
            return (
              <DivStyled style={{ display: "inline-block" }}>
                <ProfitTable currencyKey={currencyKey} {...props} />
              </DivStyled>
            );
          })
        : null}
    </div>
  );
}

function mapStateToProps(state) {
  const {
    currency,
    currencyList,
    profitDate,
    profitDateList,
    profitObjectSelCurrency
  } = state;
  return {
    currency,
    currencyList,
    profitDate,
    profitDateList,
    profitObjectSelCurrency
  };
}

const AppNew = connect(
  mapStateToProps,
  {
    setCurrency: frontEndActions.setCurrency,
    setDate: frontEndActions.setProfitDate,
    getData: frontEndActions.getProfitData,
    setDateList: frontEndActions.setProfitDateList
  }
)(App);

export default AppNew;
