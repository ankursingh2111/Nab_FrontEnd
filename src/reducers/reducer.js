export const types = {
  SET_CURRENCY: "SET_CUURENCY",
  SET_CURRENCY_LIST: "SET_CURRENCY_LIST",
  SET_PROFIT_DATE: "SET_PROFIT_DATE",
  SET_PROFIT_DATE_LIST: "SET_PROFIT_DATE_LIST",
  GET_PROFIT_DATE_LIST: "GET_PROFIT_DATE_LIST",
  SET_PROFIT_OBJECT: "SET_PROFIT_OBJECT",
  GET_PROFIT_DATA: "GET_PROFIT_DATA"
};

const initialState = {
  currency: "",
  currencyList: [],
  profitDate: "",
  profitDateList: [],
  profitObject: {},
  profitObjectSelCurrency: {}
};

export const frontEndReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENCY: {
      let objCurr = {};
      if (payload) {
        objCurr[payload] = state.profitObject[payload];
      }

      return {
        ...state,
        currency: payload,
        profitObjectSelCurrency: objCurr
      };
    }
    case types.SET_CURRENCY_LIST: {
      return {
        ...state,
        currencyList: payload
      };
    }
    case types.SET_PROFIT_DATE: {
      return {
        ...state,
        profitDate: payload
      };
    }
    case types.SET_PROFIT_DATE_LIST: {
      return {
        ...state,
        profitDateList: payload
      };
    }
    case types.SET_PROFIT_OBJECT: {
      return {
        ...state,
        profitObject: payload,
        profitObjectSelCurrency: payload
      };
    }
    default:
      return state;
  }
};

export const frontEndActions = {
  setCurrency: payload => ({ type: types.SET_CURRENCY, payload }),
  setCurrencyList: payload => ({ type: types.SET_CURRENCY_LIST, payload }),
  setProfitDate: payload => ({ type: types.SET_PROFIT_DATE, payload }),
  setProfitDateList: payload => ({ type: types.SET_PROFIT_DATE_LIST, payload }),
  getProfitDateList: () => ({ type: types.GET_PROFIT_DATE_LIST }),
  setProfitObject: payload => ({
    type: types.SET_PROFIT_OBJECT,
    payload
  }),
  getProfitData: payload => ({
    type: types.GET_PROFIT_DATA,
    payload
  })
};
