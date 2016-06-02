import classes from './CoreLayout.scss'
import 'static/styles/core.scss'

export default class CoreLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className={classes.mainContainer}>
        {children}
      </div>
    );
  }
}
