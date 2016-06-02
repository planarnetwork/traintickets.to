import classes from './LegIcon.scss'
import CustomIcon from '../icon/CustomIcon'

export default class LegIcon extends React.Component {
    static propTypes = {
        mode: React.PropTypes.string,
    };

    render() {
        const { mode, className, ...other } = this.props;

        return (
            <span className={className + ' ' + classes.legIcon}>
              <CustomIcon name={mode} />
            </span>
        );
    }
}
