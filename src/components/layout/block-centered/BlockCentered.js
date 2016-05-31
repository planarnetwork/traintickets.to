import classes from './BlockCentered.scss';

/*
    Absolute centered block. Parent node should have relative, absolute or fixed position

    Example: <BlockCentered>Html here</BlockCentered>
*/

export default class BlockCentered extends React.Component {
    static propTypes = {
        children: React.PropTypes.any.isRequired
    };

    render() {
        const { children, className, ...other } = this.props;

        return (
            <section className={className + ' ' + classes.blockCentered } {...other} >
              {children}
            </section>
        );
    }
}
