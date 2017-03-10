import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'bill/:congress/:billId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Bill = require('./bill.container').default
      const reducer = require('./bill.module').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'bill', reducer })

      /*  Return getComponent   */
      cb(null, Bill)

    /* Webpack named bundle   */
    }, 'bill')
  }
})
