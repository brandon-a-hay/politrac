import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import Bill from './bill.component'
import { loadBill } from './bill.module'

class BillContainer extends Component {
  static propTypes = {
    bill: PropTypes.any,
    senatorsLoading: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    const dispatch = this.props.dispatch
    const congress = this.props.params.congress
    // the api returns bill numbers with '.'s in them, which will 404 on the get bill endpoint
    const billId = this.props.params.billId.replace(/[.]/g, '')
    dispatch(loadBill(congress, billId))
  }

  render() {
    const { bill, senatorsLoading, lastUpdated } = this.props
    return(
      <div>
        {!bill
          ? (senatorsLoading ? <h2>Loading...</h2> : <h2>Bill not found</h2>)
          : <div style={{ opacity: senatorsLoading ? 0.5 : 1 }}>
              <Bill bill={bill} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bill: state.bill.bill,
    senatorsLoading: state.bill.senatorsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBill: (congress, id) => {
      dispatch(loadBill(congress, id))
    }, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillContainer)
