'use strict'

const GitHubApi = require("github")

const apiFromCredentials = (token) => {
  let github = new GitHubApi({
    version: "3.0.0",
    timeout: 5000,
    headers: {
      "user-agent": "Mission-Control"
    }
  })

  github.authenticate({
    type: "oauth",
    token: token
  })

  return github
}

module.exports = {

  /**
   * When a pipeline starts, if it was triggered by a webhook, we'll set a status for it
   */
  start: (helper) => {
    
  },

  /**
   * When a pipeline ends, if it was triggered by a webhook, we'll update its status
   */
  complete: (helper) => {

    const webhookData = helper.webhookData()
    const pipelineSettings = helper.getPipelineSettings('mc', 'github', 'status_api')
    const token = helper.credentials(pipelineSettings.credentials_id).token || ''
    let github = apiFromCredentials(token)

    // If there is no webhook data or no "after" field from a github webhook, ignore this event
    if (!webhookData || !webhookData.after) {
      return
    }

    let messageForGitHub = {
      target_url: '',
      context: 'continuous-integration/mission-control'
    }

    if (helper.pipelineStatus() === 'succeeded') {
      messageForGitHub.state = 'success'
      messageForGitHub.description = 'The pipeline succeeded!'
    } else {
      messageForGitHub.state = 'failure'
      messageForGitHub.description = 'The pipeline failed!'
    }

    github.status.create(messageForGitHub)


  }

}
