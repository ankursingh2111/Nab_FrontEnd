import React from "react";

import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import App from "./App";

const mockStore = configureMockStore();
const store = mockStore({
  currency: "",
  currencyList: "",
  profitDate: "",
  profitDateList: "",
  profitObjectSelCurrency: ""
});
describe("Testing the App Componenet", () => {
  let AppComponent;
  beforeEach(() => {
    AppComponent = mount(<App store={store} />);
  });
  it("form component is rendered", () => {
    expect(AppComponent.find("form").length).toEqual(1);
  });

  it("App component has 1 children", () => {
    expect(AppComponent.children().length).toEqual(1);
  });
  it("App component has 7 div element", () => {
    expect(AppComponent.find("div").length).toEqual(7);
  });
  it("App component has 2 label element", () => {
    expect(AppComponent.find("label").length).toEqual(2);
  });
});
