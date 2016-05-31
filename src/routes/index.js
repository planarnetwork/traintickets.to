// We only need to import the modules necessary for initial render
import { CoreLayout } from 'layouts'
import { Map } from 'components'
import { JourneyFormContainer } from 'containers'

import { Route, IndexRoute, Link } from 'react-router'

const routes = (
  <Route path="/" component={CoreLayout}>
    <Route component={Map} >
      <IndexRoute component={JourneyFormContainer}/>
    </Route>
  </Route>
)

export default routes;
