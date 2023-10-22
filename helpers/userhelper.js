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
            let pukainar = await db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "pukainar" }).toArray()
            let thongal = await db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "thongal" }).toArray()
            let haqana = await db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "haqana" }).toArray()
            let murukkam = await db.get().collection(collection.HOUSE_RESULT_COLLECTION).find({ houseName: "murukkam" }).toArray()
            
            let houseBaseShow = [
                pukainar = pukainar[0],
                thongal = thongal[0],
                haqana = haqana[0],
                murukkam = murukkam[0]
            ]
            // console.log(houseBaseShow);
            resolve(houseBaseShow)
        })
    },
    getSportsHouseResult: () => {
        return new Promise(async (resolve, reject) => {
            let pukainar = await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).find({ houseName: "pukainar" }).toArray()
            let thongal = await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).find({ houseName: "thongal" }).toArray()
            let haqana = await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).find({ houseName: "haqana" }).toArray()
            let murukkam = await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).find({ houseName: "murukkam" }).toArray()
            
            let houseBaseShow = [
                pukainar = pukainar[0],
                thongal = thongal[0],
                haqana = haqana[0],
                murukkam = murukkam[0]
            ]
            // console.log(houseBaseShow);
            resolve(houseBaseShow)
        })
    },
    getRecentResult: () => {
        return new Promise(async (resolve, reject) => {
            let result = await db.get().collection(collection.RESULT_COLLECTION).find().sort({ _id: -1 }).limit(15).toArray()
            
            resolve(result)
        })
    }

}