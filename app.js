const express = require('express');
const app = express()

const models = require('./models');

app.get('/teacher', (req,res)=>{
  models.Teacher.findAll({
    include: [ {model: models.Subject } ]
  })
  .then(teachers=>{
    res.send(teachers)
  })
})


app.get('/subject', (req, res)=>{
  models.Subject.findAll()
  .then(subjects=>{
    
    let arrPromise = []
    let result = []
    subjects.forEach((s,i)=>{
      arrPromise.push(subjects[i].getTeachers())
    })
    
    let forEachCb = (datas, cb) =>{
      datas.forEach((d,i)=>{
        let obj = {
          subject: subjects[i],
          teachers: d
        }
        result.push(obj)
      })
      cb(result)
    }

    Promise.all(arrPromise)
    .then(subjectjoin=>{
      forEachCb(subjectjoin, (result)=>{
        res.send(result)
      })
    })
    
  })
})

app.listen(3001, ()=>{
  console.log(3001);
})