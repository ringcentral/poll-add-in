/**
 * ringcentral id and github id mapping
 */

import Sequelize from 'sequelize'
import sequelize from './sequelize'

export const Record = sequelize.define('Record', {
  id: { // should be webhookId-userId
    type: Sequelize.STRING,
    primaryKey: true
  },
  data: {
    type: Sequelize.STRING
  }
})
