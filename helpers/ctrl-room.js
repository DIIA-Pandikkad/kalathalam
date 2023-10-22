var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcryptjs')

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
                            adno: resultDatas.adno[0],
                            pos: resultDatas.pos[0],
                            grade: resultDatas.grade[0],
                            score: resultDatas.score[0]
                        },
                        {
                            sino: resultDatas.sino[1],
                            adno: resultDatas.adno[1],
                            pos: resultDatas.pos[1],
                            grade: resultDatas.grade[1],
                            score: resultDatas.score[1]
                        },
                        {
                            sino: resultDatas.sino[2],
                            adno: resultDatas.adno[2],
                            pos: resultDatas.pos[2],
                            grade: resultDatas.grade[2],
                            score: resultDatas.score[2]
                        },
                        {
                            sino: resultDatas.sino[3],
                            adno: resultDatas.adno[3],
                            pos: resultDatas.pos[3],
                            grade: resultDatas.grade[3],
                            score: resultDatas.score[3]
                        },
                        {
                            sino: resultDatas.sino[4],
                            adno: resultDatas.adno[4],
                            pos: resultDatas.pos[4],
                            grade: resultDatas.grade[4],
                            score: resultDatas.score[4]
                        },
                        {
                            sino: resultDatas.sino[5],
                            adno: resultDatas.adno[5],
                            pos: resultDatas.pos[5],
                            grade: resultDatas.grade[5],
                            score: resultDatas.score[5]
                        },
                        {
                            sino: resultDatas.sino[6],
                            adno: resultDatas.adno[6],
                            pos: resultDatas.pos[6],
                            grade: resultDatas.grade[6],
                            score: resultDatas.score[6]
                        },
                        {
                            sino: resultDatas.sino[7],
                            adno: resultDatas.adno[7],
                            pos: resultDatas.pos[7],
                            grade: resultDatas.grade[7],
                            score: resultDatas.score[7]
                        },
                        {
                            sino: resultDatas.sino[8],
                            adno: resultDatas.adno[8],
                            pos: resultDatas.pos[8],
                            grade: resultDatas.grade[8],
                            score: resultDatas.score[8]
                        },
                        {
                            sino: resultDatas.sino[9],
                            adno: resultDatas.adno[9],
                            pos: resultDatas.pos[9],
                            grade: resultDatas.grade[9],
                            score: resultDatas.score[9]
                        },
                        {
                            sino: resultDatas.sino[10],
                            adno: resultDatas.adno[10],
                            pos: resultDatas.pos[10],
                            grade: resultDatas.grade[10],
                            score: resultDatas.score[10]
                        },
                        {
                            sino: resultDatas.sino[11],
                            adno: resultDatas.adno[11],
                            pos: resultDatas.pos[11],
                            grade: resultDatas.grade[11],
                            score: resultDatas.score[11]
                        },
                        {
                            sino: resultDatas.sino[12],
                            adno: resultDatas.adno[12],
                            pos: resultDatas.pos[12],
                            grade: resultDatas.grade[12],
                            score: resultDatas.score[12]
                        }
                    ]
                }
            ]
            let pname = await db.get().collection(collection.PROGRAM_COLLECTION).findOne({ pcode: resultData[0].pcode })
            var programData = [
                {
                    pcode: resultDatas.pcode,
                    pname: pname.pname,
                    data: []
                }
            ]
            console.log(programData);
            console.log(resultData[0].result[0].adno);
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

                    if (resultData[0].result[i].adno == 0) {
                        break;
                    } else {
                        console.log(i)
                        const adno = resultData[0].result[i].adno;
                        if (adno) {
                            let candidate = await db.get().collection(collection.CANDIDATE_COLLECTION).findOne({ adno: adno })
                            console.log('adno:', adno);
                            console.log('candidate:', candidate);
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
    doHouseResultEntry: (houseDatas) => {
        return new Promise(async (resolve, reject) => {
            console.log(houseDatas);
            var pukainar = [
                {
                    houseName: "pukainar",
                    houseBase: houseDatas.Tscore[0],
                    subJuniorBased: houseDatas.sjTscore[0],
                    JuniorBased: houseDatas.jTscore[0],
                    SeniorBased: houseDatas.sTscore[0],
                    superSeniorBased: houseDatas.ssTscore[0],

                }
            ]
            var thongal = [
                {
                    houseName: "thongal",
                    houseBase: houseDatas.Tscore[1],
                    subJuniorBased: houseDatas.sjTscore[1],
                    JuniorBased: houseDatas.jTscore[1],
                    SeniorBased: houseDatas.sTscore[1],
                    superSeniorBased: houseDatas.ssTscore[1],

                }
            ]
            var haqana = [
                {
                    houseName: "haqana",
                    houseBase: houseDatas.Tscore[2],
                    subJuniorBased: houseDatas.sjTscore[2],
                    JuniorBased: houseDatas.jTscore[2],
                    SeniorBased: houseDatas.sTscore[2],
                    superSeniorBased: houseDatas.ssTscore[2],
                }
            ]
            var murukkam = [
                {
                    houseName: "murukkam",
                    houseBase: houseDatas.Tscore[3],
                    subJuniorBased: houseDatas.sjTscore[3],
                    JuniorBased: houseDatas.jTscore[3],
                    SeniorBased: houseDatas.sTscore[3],
                    superSeniorBased: houseDatas.ssTscore[3],
                }
            ]
            let ResultEnter = await db.get().collection(collection.HOUSE_RESULT_COLLECTION).findOne({ houseName: pukainar[0].houseName })
            if (ResultEnter) {
                console.log('result already exist');
                await db.get().collection(collection.HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: pukainar[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: pukainar[0].houseBase,
                                subJuniorBased: pukainar[0].subJuniorBased,
                                JuniorBased: pukainar[0].JuniorBased,
                                SeniorBased: pukainar[0].SeniorBased,
                                superSeniorBased: pukainar[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                await db.get().collection(collection.HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: thongal[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: thongal[0].houseBase,
                                subJuniorBased: thongal[0].subJuniorBased,
                                JuniorBased: thongal[0].JuniorBased,
                                SeniorBased: thongal[0].SeniorBased,
                                superSeniorBased: thongal[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                await db.get().collection(collection.HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: haqana[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: haqana[0].houseBase,
                                subJuniorBased: haqana[0].subJuniorBased,
                                JuniorBased: haqana[0].JuniorBased,
                                SeniorBased: haqana[0].SeniorBased,
                                superSeniorBased: haqana[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                await db.get().collection(collection.HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: murukkam[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: murukkam[0].houseBase,
                                subJuniorBased: murukkam[0].subJuniorBased,
                                JuniorBased: murukkam[0].JuniorBased,
                                SeniorBased: murukkam[0].SeniorBased,
                                superSeniorBased: murukkam[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                console.log('result updated');
            } else {
                await db.get().collection(collection.HOUSE_RESULT_COLLECTION).insertMany([
                    {
                        houseName: pukainar[0].houseName,
                        houseBase: pukainar[0].houseBase,
                        subJuniorBased: pukainar[0].subJuniorBased,
                        JuniorBased: pukainar[0].JuniorBased,
                        SeniorBased: pukainar[0].SeniorBased,
                        superSeniorBased: pukainar[0].superSeniorBased,
                        modified: "$$NOW"
                    },
                    {
                        houseName: thongal[0].houseName,
                        houseBase: thongal[0].houseBase,
                        subJuniorBased: thongal[0].subJuniorBased,
                        JuniorBased: thongal[0].JuniorBased,
                        SeniorBased: thongal[0].SeniorBased,
                        superSeniorBased: thongal[0].superSeniorBased,
                        modified: "$$NOW"
                    },
                    {
                        houseName: haqana[0].houseName,
                        houseBase: haqana[0].houseBase,
                        subJuniorBased: haqana[0].subJuniorBased,
                        JuniorBased: haqana[0].JuniorBased,
                        SeniorBased: haqana[0].SeniorBased,
                        superSeniorBased: haqana[0].superSeniorBased,
                        modified: "$$NOW"
                    },
                    {
                        houseName: murukkam[0].houseName,
                        houseBase: murukkam[0].houseBase,
                        subJuniorBased: murukkam[0].subJuniorBased,
                        JuniorBased: murukkam[0].JuniorBased,
                        SeniorBased: murukkam[0].SeniorBased,
                        superSeniorBased: murukkam[0].superSeniorBased,
                        modified: "$$NOW"
                    }
                ]).then((data) => {
                    console.log('result inserted');
                })
                console.log('result not exist');
            }
            resolve({ status: true })
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
    doSportsHouseResultEntry: (houseDatas) => {
        return new Promise(async (resolve, reject) => {
            console.log(houseDatas);
            var pukainar = [
                {
                    houseName: "pukainar",
                    houseBase: houseDatas.Tscore[0],
                    subJuniorBased: houseDatas.sjTscore[0],
                    JuniorBased: houseDatas.jTscore[0],
                    SeniorBased: houseDatas.sTscore[0],
                    superSeniorBased: houseDatas.ssTscore[0],

                }
            ]
            var thongal = [
                {
                    houseName: "thongal",
                    houseBase: houseDatas.Tscore[1],
                    subJuniorBased: houseDatas.sjTscore[1],
                    JuniorBased: houseDatas.jTscore[1],
                    SeniorBased: houseDatas.sTscore[1],
                    superSeniorBased: houseDatas.ssTscore[1],

                }
            ]
            var haqana = [
                {
                    houseName: "haqana",
                    houseBase: houseDatas.Tscore[2],
                    subJuniorBased: houseDatas.sjTscore[2],
                    JuniorBased: houseDatas.jTscore[2],
                    SeniorBased: houseDatas.sTscore[2],
                    superSeniorBased: houseDatas.ssTscore[2],
                }
            ]
            var murukkam = [
                {
                    houseName: "murukkam",
                    houseBase: houseDatas.Tscore[3],
                    subJuniorBased: houseDatas.sjTscore[3],
                    JuniorBased: houseDatas.jTscore[3],
                    SeniorBased: houseDatas.sTscore[3],
                    superSeniorBased: houseDatas.ssTscore[3],
                }
            ]
            let ResultEnter = await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).findOne({ houseName: pukainar[0].houseName })
            if (ResultEnter) {
                console.log('result already exist');
                await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: pukainar[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: pukainar[0].houseBase,
                                subJuniorBased: pukainar[0].subJuniorBased,
                                JuniorBased: pukainar[0].JuniorBased,
                                SeniorBased: pukainar[0].SeniorBased,
                                superSeniorBased: pukainar[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: thongal[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: thongal[0].houseBase,
                                subJuniorBased: thongal[0].subJuniorBased,
                                JuniorBased: thongal[0].JuniorBased,
                                SeniorBased: thongal[0].SeniorBased,
                                superSeniorBased: thongal[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: haqana[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: haqana[0].houseBase,
                                subJuniorBased: haqana[0].subJuniorBased,
                                JuniorBased: haqana[0].JuniorBased,
                                SeniorBased: haqana[0].SeniorBased,
                                superSeniorBased: haqana[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).updateOne(
                    { houseName: murukkam[0].houseName },
                    [
                        {
                            $set:
                            {
                                houseBase: murukkam[0].houseBase,
                                subJuniorBased: murukkam[0].subJuniorBased,
                                JuniorBased: murukkam[0].JuniorBased,
                                SeniorBased: murukkam[0].SeniorBased,
                                superSeniorBased: murukkam[0].superSeniorBased,
                                modified: "$$NOW"
                            }
                        }
                    ])
                console.log('result updated');
            } else {
                await db.get().collection(collection.SPORTS_HOUSE_RESULT_COLLECTION).insertMany([
                    {
                        houseName: pukainar[0].houseName,
                        houseBase: pukainar[0].houseBase,
                        subJuniorBased: pukainar[0].subJuniorBased,
                        JuniorBased: pukainar[0].JuniorBased,
                        SeniorBased: pukainar[0].SeniorBased,
                        superSeniorBased: pukainar[0].superSeniorBased,
                        modified: "$$NOW"
                    },
                    {
                        houseName: thongal[0].houseName,
                        houseBase: thongal[0].houseBase,
                        subJuniorBased: thongal[0].subJuniorBased,
                        JuniorBased: thongal[0].JuniorBased,
                        SeniorBased: thongal[0].SeniorBased,
                        superSeniorBased: thongal[0].superSeniorBased,
                        modified: "$$NOW"
                    },
                    {
                        houseName: haqana[0].houseName,
                        houseBase: haqana[0].houseBase,
                        subJuniorBased: haqana[0].subJuniorBased,
                        JuniorBased: haqana[0].JuniorBased,
                        SeniorBased: haqana[0].SeniorBased,
                        superSeniorBased: haqana[0].superSeniorBased,
                        modified: "$$NOW"
                    },
                    {
                        houseName: murukkam[0].houseName,
                        houseBase: murukkam[0].houseBase,
                        subJuniorBased: murukkam[0].subJuniorBased,
                        JuniorBased: murukkam[0].JuniorBased,
                        SeniorBased: murukkam[0].SeniorBased,
                        superSeniorBased: murukkam[0].superSeniorBased,
                        modified: "$$NOW"
                    }
                ]).then((data) => {
                    console.log('result inserted');
                })
                console.log('result not exist');
            }
            resolve({ status: true })
        })
    }
}