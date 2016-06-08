export default class ValueLinkedComponent extends React.Component {
  static propTypes = {
    value: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  getValueLink(props) {
    if (!props) props = this.props;

    return {
      value: props.value,
      requestChange: props.onChange
    }
  }

  render() {}
};
