import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'dashboard',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Dashboard = require('./dashboard.container').default
      const reducer = require('./dashboard.module').default

      injectReducer(store, {
        key: 'dashboard',
        reducer
      })

      next(null, Dashboard)

    }, 'dashboard')
  }
})
