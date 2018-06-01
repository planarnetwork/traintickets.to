import * as React from 'react';
import {Footer} from "../../Component/Footer/Footer";
import {Header} from "../../Component/Header/Header";

export function Layout({ children }: { children: JSX.Element[] }) {
  return (
    <div className="App">
      <Header/>
      { ...children }
      <Footer/>
    </div>
  );
}
