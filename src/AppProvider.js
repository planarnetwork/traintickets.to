import { Router } from 'react-router'

class AppContainer extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.object.isRequired,
    routerKey: React.PropTypes.number,
    store: React.PropTypes.object.isRequired
  }

  render () {
    const { history, routes, routerKey, store } = this.props

    return (
      <ReactRedux.Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </ReactRedux.Provider>
    )
  }
}

export default AppContainer
