'use strict'

module.exports = {

  id: 'status_api',
  name: 'GitHub Status API Settings',

  settings: {
    account: {
      name: 'GitHub Account',
      type: 'account',
      account_type: 'github',
      required: true
    }
  }

}
