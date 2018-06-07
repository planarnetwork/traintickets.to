import * as React from 'react';
import {Footer} from "../../component/Footer/Footer";
import {Header} from "../../component/Header/Header";

export function Layout({ children }: { children: JSX.Element[] }) {
  return (
    <div className="App">
      <Header/>
      { ...children }
      <Footer/>
    </div>
  );
}
