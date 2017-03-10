export const LOAD_BILL_REQUEST = 'LOAD_BILL_REQUEST'
export const LOAD_BILL_SUCCESS = 'LOAD_BILL_SUCCESS'
export const LOAD_BILL_FAILURE = 'LOAD_BILL_FAILURE'

export const loadBill = (congress, billId) => {
  return (dispatch) => {
    dispatch({ type: LOAD_BILL_REQUEST })

    return fetch('https://api.propublica.org/congress/v1/' + congress + '/bills/' + billId + '.json', {
      headers: { 'X-API-Key': '3z530dDb0raRoHu52UmrU7lliYkQH1Pa3D8qw1z5' }
    })
    .then(res => res.json()).then(data => {
      let bill = data.results[0]

      dispatch({
        type: LOAD_BILL_SUCCESS,
        payload: bill,
        meta: {
          lastFetched: Date.now()
        }
      })
    })
    .catch(error => {
      console.log(`Failed to load billId {billId}`, error)
      dispatch({
        type: LOAD_BILL_FAILURE,
        payload: error,
        error: true
      })
    });
  }
}

const initialState = {
  lastUpdated: null,
  senatorsLoading: false,
  error: null,
  bill: null
}

export default function billReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_BILL_REQUEST:
      return {
        ...state,
        senatorsLoading: true,
        error: null
      }
    case LOAD_BILL_SUCCESS:
      return {
        ...state,
        senatorsLoading: false,
        bill: action.payload,
        lastUpdated: Date.now()
      }
    case LOAD_BILL_FAILURE:
      return {
        ...state,
        senatorsLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}
