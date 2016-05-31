export default class ValueLinkedComponent extends React.Component {
  static propTypes = {
    valueLink: React.PropTypes.shape({
        value: React.PropTypes.any.isRequired,
        requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  getValueLink(props) {
    if (!props) props = this.props;

    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    }
  }

  render() {}
};
