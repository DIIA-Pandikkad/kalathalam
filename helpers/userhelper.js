var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')

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
            let data = await db.get().collection(collection.RESULT_COLLECTION).aggregate([
                {
                    $match: {
                        pname: 'SJ1'
                    }
                }, {
                    $unwind: '$data'
                }, {
                    $group: {
                        _id: '$data.house',
                        totalScore: {
                            $sum: '$data.score'
                        },
                        data: {
                            $push: '$data'
                        }
                    }
                }, {
                    $project: {

                        data: {
                            $filter: {
                                input: '$data',
                                as: 'h',
                                cond: { $eq: ['$$h.house', 'HAQANA'] }
                            }
                        }
                    }
                }
            ]).toArray(function (err, result) {
                if (err) throw err;
                console.log(result[0].data);
                resolve(result);
            });
        });
    },
}