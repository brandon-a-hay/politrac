import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Senators from './senators.component'
import ActiveBills from './activebills.component'
import { loadSenatorsAction, loadLegislationAction } from './dashboard.actions'
import { states } from '../../constants'

class DashboardContainer extends Component {
  static propTypes = {
    homeState: PropTypes.string.isRequired,
    senators: PropTypes.array,
    legislation: PropTypes.array,
    senatorsLoading: PropTypes.bool.isRequired,
    legislationLoading: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  setUserState = event => {
    let homeState = event.target.value
    this.props.dispatch(loadSenatorsAction(homeState))
  }

  componentWillMount() {
    const { dispatch, homeState } = this.props
    dispatch(loadSenatorsAction(homeState))
    dispatch(loadLegislationAction())
  }

  render() {
    const { senators, senatorsLoading, legislation, legislationLoading, lastUpdated, homeState } = this.props
    const noSenators = senators.length === 0
    const noLegislation = legislation.length === 0

    return(
      <div>
        <label>My state: </label>
        <select onChange={this.setUserState}>
          {states.map(state => (
            <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
          ))}
        </select>
        <div>
          {noSenators
            ? (senatorsLoading ? <h2>Loading senators...</h2> : <h2>No senators found</h2>)
            : <div style={{ opacity: senatorsLoading ? 0.5 : 1 }}>
                <Senators senators={senators} />
              </div>
          }
        </div>
        <div>
          {noLegislation
            ? (legislationLoading ? <h2>Loading legislation...</h2> :
            <h2>No legislation found. Abort America.</h2>)
            : <div style={{ opacity: legislationLoading ? 0.5 : 1 }}>
                <ActiveBills legislation={legislation} />
              </div>
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSenatorsAction: (userState) => {
      dispatch(loadSenatorsAction(userState))
    },
    loadLegislationAction: () => {
      dispatch(loadLegislationAction())
    }, dispatch
  }
}

const mapStateToProps = (state) => {
  return {
    senators: state.dashboard.senators,
    homeState: state.dashboard.homeState,
    senatorsLoading: state.dashboard.senatorsLoading,
    legislationLoading: state.dashboard.legislationLoading,
    legislation: state.dashboard.legislation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
