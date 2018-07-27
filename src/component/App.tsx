import * as React from 'react';
import {Header} from "./Header/Header";
import {Route} from "react-router";
import {AboutPage} from "./About/AboutPage";
import {FAQPage} from "./FAQ/FAQPage";
import {Container} from "../service/Container";

export function App() {
  const container = new Container();

  return (
    <div id="top" className="App max">
      <Header/>
      <Route
        exact={true}
        path="/"
        render={container.indexPage}
      />
      <Route path="/about" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
    </div>
  );
}
