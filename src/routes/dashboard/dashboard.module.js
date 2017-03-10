import * as Constants from '../../constants'

const initialState = {
  lastFetched: null,
  senatorsLoading: false,
  error: null,
  senators: [],
  legislation: [],
  legislationLoading: false,
  homeState: ''
}

export default function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case Constants.LOAD_SENATORS_REQUEST:
      return {
        ...state,
        senatorsLoading: true,
        error: null
      }
    case Constants.LOAD_SENATORS_SUCCESS:
      return {
        ...state,
        senatorsLoading: false,
        senators: action.payload
      }
    case Constants.LOAD_SENATORS_FAILURE:
      return {
        ...state,
        senatorsLoading: false,
        error: action.payload
      }
    case Constants.LOAD_LEGISLATION_REQUEST:
      return {
        ...state,
        legislationLoading: true,
        error: null
      }
    case Constants.LOAD_LEGISLATION_SUCCESS:
      return {
        ...state,
        legislationLoading: false,
        legislation: action.payload
      }
    case Constants.LOAD_LEGISLATION_FAILURE:
      return {
        ...state,
        legislationLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}
