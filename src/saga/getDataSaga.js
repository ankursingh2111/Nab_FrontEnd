import { types, frontEndActions } from "../reducers/reducer";
import { takeLatest, call, put } from "redux-saga/effects";
import querystring from "querystring";

export default function* index() {
  yield takeLatest(types.GET_PROFIT_DATE_LIST, getDateList);
  yield takeLatest(types.SET_PROFIT_DATE, getAllCurrencyData);
}

export function* getDateList() {
  let response;

  try {
    const commonSettingsUrl = "http://localhost:8080/api/getCurrencyDate";
    response = yield call(fetch, commonSettingsUrl);
    const data = yield call([response, "json"]);

    yield put(frontEndActions.setProfitDateList(data));
  } catch (e) {
    e.log(e);
  }
}
export function* getAllCurrencyData({ payload }) {
  let response;
  try {
    response = yield getData({ profitDate: payload });
    yield put(frontEndActions.setCurrencyList(Object.keys(response)));
    yield put(frontEndActions.setProfitObject(response));
  } catch (e) {}
}

export function* getData(payload) {
  const currency = payload.currency;
  const profitDate = payload.profitDate;

  let response;
  try {
    let paramList = querystring.stringify({
      currency: currency,
      profitDate: profitDate
    });
    const commonSettingsUrl =
      "http://localhost:8080/api/getProfit?" + paramList;
    response = yield call(fetch, commonSettingsUrl);
    const data = yield call([response, "json"]);

    return data;
  } catch (e) {}
}
