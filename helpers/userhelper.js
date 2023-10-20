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
            let pukainar = db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "pukainar" }).toArray()
            let thongal =  db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "thongal" }).toArray()
            let haqana =  db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "haqana" }).toArray()
            let murukkam =  db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "murukkam" }).toArray()
            
            let houseBaseShow = [
                pukainar = pukainar[0],
                thongal = thongal[0],
                haqana = haqana[0],
                murukkam = murukkam[0]
            ]
            // console.log(houseBaseShow);
            resolve(houseBaseShow)
        })
    }
}