import * as React from 'react';
import './Price.css';

export interface PriceProps extends React.HTMLProps<HTMLSpanElement> {
  value: number;
  direction?: string;
}

export class Price extends React.PureComponent<PriceProps, {}> {
  private get price() {
    const [pounds, pence] = (this.props.value / 100)
      .toFixed(2)
      .toString()
      .split(/[\,|\.]/);
    return { pounds, pence };
  }

  public render() {
    const { value, direction, ...rest } = this.props;
    const { pounds, pence } = this.price;

    return (
      <span className="price" {...rest}>
        <span className="price-prefix">{direction === "inward" ? "+ " : null}&pound;</span>
        {pounds}.
        <span className="price-pence">{pence}</span>
      </span>
    );
  }
}