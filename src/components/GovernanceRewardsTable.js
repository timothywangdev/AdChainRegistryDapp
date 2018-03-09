import React, { Component } from 'react'
import _ from 'lodash'
import toastr from 'toastr'
import './GovernanceAndCoreParameters.css'
import ParameterizerService from '../services/parameterizer'

class GovernanceRewardsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      claimProgress: false
    }
  }
  render () {
    return (
      <div className='AllParameters'>
        <div className='BoxFrame mt-25'>
          <span className='BoxFrameLabel ui grid'>CLAIM REWARDS</span>
          <div className='ui grid'>
            <div className='column sixteen wide'>
              <div>
                <span>Parameters</span>
                <span className='ValuesTitle'>Action</span>
              </div>
              <div>
                {this.generateRewardsTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  generateRewardsTable () {
    if (this.props.rewards.length < 1) return false

    let i = -1
    let color
    const rewards = this.props.rewards
    const table = _.reduce(rewards, (result, { name, value }) => {
      // If name exists in core param data, use blue color, else use red
      i++
      color = this.props.coreParameterData[name] ? 'f-blue bold' : 'f-red bold'
      result.push(
        <div key={name + i} className='ParameterRow'>
          <span key={name + i} className={color}>{name}</span>
          {
            !this.state.claimProgress
              ? <span key={i} className='ui button green' onClick={() => { this.claimReward(rewards[i]) }} style={{padding: '0.571429em 1.2em'}}>CLAIM</span>
              : this.state.claimProgress !== 'SUCCESS'
              ? <span key={i} className='ui green loader inline mini active' style={{padding: '.571429em 5em .571429em 0', float: 'right'}} />
              : <span key={i} style={{float: 'right', color: 'green'}}>
                Claimed <i className='icon check circle' style={{color: 'green', fontSize: '13px'}} />
              </span>
          }
        </div>
      )
      return result
    }, [])
    return table
  }

  async claimReward ({challenge_id, salt}) {
    this.setState({
      claimProgress: true
    })

    try {
      await ParameterizerService.claimReward(challenge_id, salt)
      this.setState({
        claimProgress: 'SUCCESS'
      })
    } catch (error) {
      toastr.error('There was an error claiming your reward')
      this.setState({
        claimProgress: false
      })
    }
  }
}

export default GovernanceRewardsTable
