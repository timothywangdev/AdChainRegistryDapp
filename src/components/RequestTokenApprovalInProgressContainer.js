import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'

import './RequestVotingRightsInProgressContainer.css'

class RequestVotingRightsInProgressContainer extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <div className='RequestVotingRightsInProgressContainer overflow-y'>
        <div className='Content'>
          <div><strong>Request in progress. </strong>
            <Loader indeterminate active inline />
          </div>
          <p>You will receive <strong>two</strong> MetaMask prompts:</p>
          <p><strong>First prompt:</strong> Allow adChain Registry PLCR contract to transfer adToken deposit from your account.</p>
          <p><strong>Second prompt:</strong> Request voting rights from the adChain Registry PLCR contract.</p>
        </div>
      </div>
    )
  }
}

export default RequestVotingRightsInProgressContainer
