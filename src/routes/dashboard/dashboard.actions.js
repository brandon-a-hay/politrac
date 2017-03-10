import * as Constants from '../../constants'

export const loadSenatorsAction = (userState) => {
  return (dispatch) => {
    dispatch({ type: Constants.LOAD_SENATORS_REQUEST })

    return fetch('https://api.propublica.org/congress/v1/members/senate/' + userState + '/current.json', {
      headers: { 'X-API-Key': '3z530dDb0raRoHu52UmrU7lliYkQH1Pa3D8qw1z5' }
    })
    .then(res => res.json()).then(data => {
      let senators = [...data.results]

      // get senator's introduced bills
      let billsPromises = []

      senators.forEach(senator => {
        senator.legislation = []
        billsPromises.push(
          fetch('https://api.propublica.org/congress/v1/members/' + senator.id + '/bills/introduced.json', {
            headers: { 'X-API-Key': '3z530dDb0raRoHu52UmrU7lliYkQH1Pa3D8qw1z5' }
          }).then(res => res.json())
        )
        billsPromises.push(
          fetch('https://api.propublica.org/congress/v1/members/' + senator.id + '/bills/updated.json', {
            headers: { 'X-API-Key': '3z530dDb0raRoHu52UmrU7lliYkQH1Pa3D8qw1z5' }
          }).then(res => res.json())
        )
      })

      Promise.all(billsPromises).then(data => {
        data.forEach((d) => {
          if (d.results && d.results.length > 0) {
            let senator = senators.filter(s => s.name == d.results[0].name)[0]
            for (let j = 0; j < d.results[0].bills.length; j++) {
              senator.legislation.push(d.results[0].bills[j])
            }
          }
        })

      // set up senators bill category count
      senators.forEach(senator => {
        senator.billCategories = [];
        let committeeIndexMap = {};
        let bills = senator.legislation;
        let len = bills.length;
        for (let i = 0; i < len; i++) {
          let committee = bills[i].committees
          if (!committee) {
            continue;
          }

          let committeeIndex = committeeIndexMap[committee];
          if (!committeeIndex) {
            senator.billCategories.push({
              name: committee,
              value: 1
            });

            committeeIndexMap[committee] = committeeIndex;
          } else {
            senator.billCategories[committeeIndex].value += 1
          }
        }
      })

        dispatch({
          type: Constants.LOAD_SENATORS_SUCCESS,
          payload: senators,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Failed to load senators bills`, error)
      });
    })
    .catch(error => {
      console.error(`Failed to load senator data`, error)
      dispatch({
        type: Constants.LOAD_SENATORS_FAILURE,
        payload: error,
        error: true
      })
    })
  }
}

export function loadLegislationAction () {
  return (dispatch) => {
    dispatch({ type: Constants.LOAD_LEGISLATION_REQUEST })

    return fetch('https://api.propublica.org/congress/v1/115/senate/bills/introduced.json', {
      headers: { 'X-API-Key': '3z530dDb0raRoHu52UmrU7lliYkQH1Pa3D8qw1z5' }
    })
    .then(res => res.json()).then(data => {
      let legislation = data.results[0]

      dispatch({
        type: Constants.LOAD_LEGISLATION_SUCCESS,
        payload: legislation,
        meta: {
          lastFetched: Date.now()
        }
      })
    })
    .catch(error => {
      console.log('failed to get recent legislation data', error)
      dispatch({
        type: Constants.LOAD_LEGISLATION_FAILURE,
        payload: error,
        error: true
      })
    })
  }
}
