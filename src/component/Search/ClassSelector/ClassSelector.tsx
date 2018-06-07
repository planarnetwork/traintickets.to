import autobind from "autobind-decorator";
import {SearchContext, SearchProviderContext} from "../SearchContext";
import {RadioGroup} from "../../Form/RadioGroup/RadioGroup";
import * as React from "react";

@autobind
export class ClassSelector extends React.Component {

  public render() {
    return (
      <SearchContext.Consumer>
        {(context: SearchProviderContext) => (
          <RadioGroup name="class" options={["standardClass", "firstClass"]} labels={["Standard", "First"]} onChange={context.setState}/>
        )}
      </SearchContext.Consumer>
    );
  }
}
