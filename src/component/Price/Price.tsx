import * as React from 'react';
import './Price.css';

export interface PriceProps extends React.HTMLProps<HTMLSpanElement> {
    value: number;
}

// TODO: standardize it with Currency
export class Price extends React.PureComponent<PriceProps, {}> {
    private get price() {
        const [pounds, pence] = (this.props.value / 100)
            .toFixed(2)
            .toString()
            .split(/[\,|\.]/);
        return { pounds, pence };
    }

    public render() {
        const { value, ...rest } = this.props;
        const { pounds, pence } = this.price;

        return (
            <span className="price" {...rest}>
                <span className="price-prefix">&pound;</span>
                {pounds}.
                <span className="price-pence">{pence}</span>
            </span>
        );
    }
}