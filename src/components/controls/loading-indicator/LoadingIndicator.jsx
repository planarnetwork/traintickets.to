import classes from './LoadingIndicator.scss'

export default class LoadingIndicator extends React.Component {
    render() {
        const { mode, className, ...other } = this.props;

        return (
            <figure className={ (className || '') + ' ' + classes.spinner} {...other} ></figure>
        );
    }
}
