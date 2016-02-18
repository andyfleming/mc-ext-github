'use strict'

module.exports = {
  vendor: 'mc',
  id: 'github',
  name: 'GitHub',
  description: 'Extension for working with GitHub, including cloning repos, handling webhooks, and the status API.',
  webhooks: [
    require('./src/webhooks/execute-pipeline')
  ],
  stages: [
    require('./src/stages/clone-repo')
  ],
  pipeline_listeners: [
    require('./src/pipeline-listeners/status-api')
  ],
  pipeline_settings: [
    require('./src/pipeline-settings/status-api-settings')
  ],
  logs: [],
  accounts: [
    require('./src/accounts/github-oauth')
  ]
}
