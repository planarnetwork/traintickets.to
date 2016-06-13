import classes from './ExpandTransition.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class ExpandTransition extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    className: React.PropTypes.string.isRequired,
    children: React.PropTypes.any,
    component: React.PropTypes.any.isRequired
  };

  render() {
    const { className, children, component, ...other } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionName={classes}
        component={component}
        className={className}
        {...other} >

        {children}

      </ReactCSSTransitionGroup>
    )
  }
}
