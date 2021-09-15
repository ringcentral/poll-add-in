import Sequelize from 'sequelize'
import sequelize from './sequelize'

export const Webhook = sequelize.define('Webhook', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  webhook: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  desc: {
    type: Sequelize.STRING
  },
  options: {
    type: Sequelize.JSON
  },
  expire: {
    type: Sequelize.INTEGER
  },
  multi: {
    type: Sequelize.INTEGER
  },
  voteIds: {
    type: Sequelize.JSON
  },
  data: {
    type: Sequelize.JSON
  }
})
