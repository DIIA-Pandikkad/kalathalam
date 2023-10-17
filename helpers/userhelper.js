var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcryptjs')

module.exports = {
    getResult: (pcode) => {
        return new Promise(async (resolve, reject) => {
            let result = await db.get().collection(collection.RESULT_COLLECTION).findOne({ pcode: pcode })
            console.log(result);
            resolve(result)
        })
    },
    getHouseResult: () => {
        return new Promise(async (resolve, reject) => {
          let isthere = await db.get().collection(collection.RESULT_COLLECTION).findOne({ 'data.house': 'HAQANA' });
            console.log('isthere:', isthere);
          let result = await db.get().collection(collection.RESULT_COLLECTION).aggregate([
            {
              $match: {
                "data.house": 'HAQANA'
              }
            }, {
              $unwind: '$data'
            }, {
              $group: {
                _id: 'HAQANA',
                totalScore: {
                  $sum: '$data.score'
                }
              }
            }
          ]).toArray();
          console.log('Result:', result);
          resolve(result[0].totalScore);
        });
      }
}