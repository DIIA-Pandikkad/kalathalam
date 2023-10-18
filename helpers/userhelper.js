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
         
          let results = await db.get().collection(collection.RESULT_COLLECTION).find({'data.house':'HAQANA'}).toArray();

            console.log('results:', results[0].data);
        });
      }
}