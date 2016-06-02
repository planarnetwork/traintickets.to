import classes from './CustomIcon.scss';

function requireAll(r) { return r.keys().map(function(key) {
  return { key: key.match(/\.\/(.*)\.png/)[1], data: r(key) };
}); }
const icons = requireAll(require.context('static/images/custom-icons/', false, /\.png$/));

console.log(icons);

/*
    Custom Icon

    Example: <Icon name="play" />
    Check available icons in src/static/images/custom-icons
*/

export default class CustomIcon extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    render() {
        const { name, className, style, ...other } = this.props;

        const iconStyle = _.extend(style || {}, { backgroundImage: 'url(' + _.find(icons, x => x.key == name).data + ')' });

        return (
            <span style={iconStyle} className={className + ' ' + classes.customIcon} {...other} ></span>
        );
    }
}
