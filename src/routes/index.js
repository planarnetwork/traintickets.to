// We only need to import the modules necessary for initial render
import { CoreLayout } from 'layouts'
import { Map, JourneyForm } from 'components'

import { Route, IndexRoute, Link } from 'react-router'

const routes = (
  <Route path="/" component={CoreLayout}>
    <Route component={Map} >
      <IndexRoute component={JourneyForm}/>
    </Route>
  </Route>
)

export default routes;
