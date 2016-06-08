import update from 'react-addons-update';

class DataBindingHelper {
    static setValue(key, value, state, changeFn) {
        var updateOptions = {};

        key.split(".").reduce(function(previous, current, i, keys) {
            if (keys.length === 1)
                updateOptions[current] = { $set: value };
            else if (i === 0) {
                let x = {};
                updateOptions[current] = x;
                return x;
            }
            else if (keys.length - 1 === i) {
                previous[current] = { $set: value };
            }
            else {
                let x = {};
                previous[current] = x;
                return x;
            }
        }, "")

        changeFn(update(state, updateOptions));
    }

    static getValue(obj, key) {
        return key.split(".").reduce(function(previous, current, i) {
            if (i === 0)
                return obj[current];
            else
                return previous[current];
        }, '');
    }

    static linkWithState(key, component, changeFn, state) {
        if (!_.isFunction(changeFn)) changeFn = component.setState.bind(component);
        if (!_.isObject(state)) state = component.state;

        return {
            value: this.getValue(state, key),
            onChange: (value => {
                this.setValue(key, value, state, changeFn);
            }).bind(this)
        }
    }
}

export default DataBindingHelper;
