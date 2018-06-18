import * as React from 'react';
import {Footer} from "../../component/Footer/Footer";
import {Header} from "../../component/Header/Header";

export function Layout({ children, footerPrice }: LayoutProps) {
  return (
    <div className="App max">
      <Header/>
      { ...children }
      <Footer price={footerPrice}/>
    </div>
  );
}

export interface LayoutProps {
  children: Array<(JSX.Element | undefined)>;
  footerPrice: number;
}