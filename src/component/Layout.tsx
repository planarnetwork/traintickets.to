import * as React from 'react';
import {Header} from "./Header/Header";
import {Route} from "react-router";
import {IndexPage} from "./Index/IndexPage";
import {AboutPage} from "./About/AboutPage";
import {FAQPage} from "./FAQ/FAQPage";

export function Layout() {
  return (
    <div id="top" className="App max">
      <Header/>
      <Route exact={true} path="/" component={IndexPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
    </div>
  );
}
