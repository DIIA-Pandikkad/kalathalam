var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')

module.exports = {

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {

            let username = await db.get().collection(collection.CTRLER_COLLECTION).findOne({ username: userData.username })
            console.log(username)
            if (username) {
                resolve({ status: false })
            } else {
                userData.password = await bcrypt.hash(userData.password, 10)
                db.get().collection(collection.CTRLER_COLLECTION).insertOne(userData).then((data) => {
                    userData.status = true
                    resolve(userData)

                })


            }
        })

    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.CTRLER_COLLECTION).findOne({ username: userData.username })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log("login success");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("login Failed");
                        resolve({ status: false })
                    }
                })
            } else {
                console.log("login failed");
                resolve({ status: false })
            }
        })
    },
    doCandidateEntry: (candidateData) => {
        return new Promise(async (resolve, reject) => {
            // let candidate = await db.get().collection(collection.CANDIDATE_COLLECTION).findOne({ CCode: candidateData.CCode })
            // console.log(candidate);
            // if (candidate) {
            //     resolve({ status: false })
            // } else {
            //     db.get().collection(collection.CANDIDATE_COLLECTION).insertOne(candidateData).then((data) => {
            //         candidateData.status = true
            //         resolve(candidateData)
            //     })
            // }
            db.get().collection(collection.CANDIDATE_COLLECTION).insertOne(candidateData).then((data) => {
                candidateData.status = true
                resolve(candidateData)
            })
        })
    },
    doProgramEntry: (programData) => {
        return new Promise(async (resolve, reject) => {

            db.get().collection(collection.PROGRAM_COLLECTION).insertOne(programData).then((data) => {
                programData.status = true
                resolve(programData)
            })
        })
    },
    getPrograms: () => {
        return new Promise(async (resolve, reject) => {
            let programs = await db.get().collection(collection.PROGRAM_COLLECTION).find().toArray()
            resolve(programs)
        })
    },
    doResultEntry: (resultDatas) => {
        return new Promise(async (resolve, reject) => {

            var resultData = [
                {
                    pcode: resultDatas.pcode,
                    pname: resultDatas.pname,
                    result: [
                        {
                            sino: resultDatas.sino[0],
                            ccode: resultDatas.ccode[0],
                            pos: resultDatas.pos[0],
                            grade: resultDatas.grade[0],
                            score: resultDatas.score[0]
                        },
                        {
                            sino: resultDatas.sino[1],
                            ccode: resultDatas.ccode[1],
                            pos: resultDatas.pos[1],
                            grade: resultDatas.grade[1],
                            score: resultDatas.score[1]
                        },
                        {
                            sino: resultDatas.sino[2],
                            ccode: resultDatas.ccode[2],
                            pos: resultDatas.pos[2],
                            grade: resultDatas.grade[2],
                            score: resultDatas.score[2]
                        },
                        {
                            sino: resultDatas.sino[3],
                            ccode: resultDatas.ccode[3],
                            pos: resultDatas.pos[3],
                            grade: resultDatas.grade[3],
                            score: resultDatas.score[3]
                        },
                        {
                            sino: resultDatas.sino[4],
                            ccode: resultDatas.ccode[4],
                            pos: resultDatas.pos[4],
                            grade: resultDatas.grade[4],
                            score: resultDatas.score[4]
                        },
                        {
                            sino: resultDatas.sino[5],
                            ccode: resultDatas.ccode[5],
                            pos: resultDatas.pos[5],
                            grade: resultDatas.grade[5],
                            score: resultDatas.score[5]
                        },
                        {
                            sino: resultDatas.sino[6],
                            ccode: resultDatas.ccode[6],
                            pos: resultDatas.pos[6],
                            grade: resultDatas.grade[6],
                            score: resultDatas.score[6]
                        },
                        {
                            sino: resultDatas.sino[7],
                            ccode: resultDatas.ccode[7],
                            pos: resultDatas.pos[7],
                            grade: resultDatas.grade[7],
                            score: resultDatas.score[7]
                        },
                        {
                            sino: resultDatas.sino[8],
                            ccode: resultDatas.ccode[8],
                            pos: resultDatas.pos[8],
                            grade: resultDatas.grade[8],
                            score: resultDatas.score[8]
                        },
                        {
                            sino: resultDatas.sino[9],
                            ccode: resultDatas.ccode[9],
                            pos: resultDatas.pos[9],
                            grade: resultDatas.grade[9],
                            score: resultDatas.score[9]
                        },
                        {
                            sino: resultDatas.sino[10],
                            ccode: resultDatas.ccode[10],
                            pos: resultDatas.pos[10],
                            grade: resultDatas.grade[10],
                            score: resultDatas.score[10]
                        },
                        {
                            sino: resultDatas.sino[11],
                            ccode: resultDatas.ccode[11],
                            pos: resultDatas.pos[11],
                            grade: resultDatas.grade[11],
                            score: resultDatas.score[11]
                        },
                        {
                            sino: resultDatas.sino[12],
                            ccode: resultDatas.ccode[12],
                            pos: resultDatas.pos[12],
                            grade: resultDatas.grade[12],
                            score: resultDatas.score[12]
                        }
                    ]
                }
            ]
            var programData = [
                {
                    pcode: resultDatas.pcode,
                    pname: resultDatas.pname,
                    data: []
                }
            ]

            console.log(resultData[0].result[0].ccode);
            let programs = await db.get().collection(collection.PROGRAM_COLLECTION).findOne({ pcode: resultData[0].pcode })
            if (programs) {
                let result = await db.get().collection(collection.RESULT_COLLECTION).findOne({ pcode: resultData[0].pcode })
                if (result) {
                    console.log('result already exist');
                } else {
                    db.get().collection(collection.RESULT_COLLECTION).insertOne(programData[0]).then((data) => {
                        programData[0].status = true
                        resolve(programData[0])
                    })
                }

                for (let i = 0; i < 12; i++) {
                    console.log(i)
                    if (resultData[0].result[i].ccode == 0) {
                        break;
                    } else {
                        const ccode = resultData[0].result[i].ccode;
                        if (ccode) {
                            let candidate = await db.get().collection(collection.CANDIDATE_COLLECTION).findOne({ ccode: ccode })
                            console.log(candidate);
                            if (candidate) {

                                db.get().collection(collection.RESULT_COLLECTION).updateOne({ pcode: resultData[0].pcode }, {
                                    $push: {
                                        data: {
                                            imageAdd: candidate.photo,
                                            ccode: candidate.ccode,
                                            cadno: candidate.adno,
                                            cname: candidate.name,
                                            house: candidate.house,
                                            pos: resultData[0].result[i].pos,
                                            grade: resultData[0].result[i].grade,
                                            score: resultData[0].result[i].score
                                        }
                                    }
                                })

                            }

                        } else {
                            console.log('candidate not exist');
                        }
                    }


                }
            } else {
                console.log('program not exist');
            }

        })
    }
}