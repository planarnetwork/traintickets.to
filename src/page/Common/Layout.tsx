import * as React from 'react';
import {Header} from "../../component/Header/Header";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="App max">
      <Header/>
      { ...children }
    </div>
  );
}

export interface LayoutProps {
  children: Array<(JSX.Element | undefined)>;
}