import * as React from 'react';
import {Fares} from "../../Component/Fares/Fares";
import {Footer} from "../../Component/Footer/Footer";
import {Graph} from "../../Component/Graph/Graph";
import {Header} from "../../Component/Header/Header";
import {Search} from "../../Component/Search/Search";

export function App() {
  return (
    <div className="App">
      <Header/>
      <Search/>
      <Graph/>
      <Fares/>
      <Footer/>
    </div>
  );
}


