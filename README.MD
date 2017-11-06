## SEQUELIZE MASTERY

0. buat schema
1. inisialisasi folder dengan
```
npm init
```
2. install paket2 yang diperlukan
```
npm install express body-parser sequelize pg
```
3. buat database
```
sudo -i -u postgres
createdb sequelizemastery
```
> ps: set password postgres: https://serverfault.com/questions/110154/whats-the-default-superuser-username-password-for-postgres-after-a-new-install

3. sequelize init
-generate file2 config
4. isi config.json dengan
```
development:
    username: "postgres"
    password: "postgres"
    database: "sequelizemastery"
    host: "127.0.0.1"
    dialect: "postgres"
```
5. generate model(yang telah kita buat di schema
```
sequelize model:generate --name Subject --attributes subject_name:string
sequelize model:generate --name Teacher --attributes first_name:string,last_name:string
```
> ps: namatabel = singular
6. migrating to db
```
sequelize db:migrate
```
cek db:
```
psql -d sequelizemastery
\dt
```
7. buat seed untuk data dummy
```
sequelize seed:create --name add-dummy-data
```
8. edit seed di folder seed untuk menambahkan value dummy 
menggunakan bulkInsert: http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html#instance-method-bulkInsert
```
    return queryInterface.bulkInsert('Subjects',
    [{
      subject_name: 'Kimia',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      subject_name: 'Matimatika',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .then(()=>{
      queryInterface.bulkInsert('Teachers',
      [{
        first_name: "Bambang",
        last_name: "Suprapto",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: "Sudjarwo",
        last_name: "Wonokrio",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      .then(()=>{
        
      })
    })
```
9. insert seed ke table
```
sequelize db:seed --seed <nama_file_seed>
sequelize db:seed --seed 20171106042744-add-dummy-data
```
10. menambahkan coloumn foreign key  

10.1 buat migration
```
sequelize migration:create --name add-coloumn-SubjectId-to-Teacher
```
10.2 edit migration
add coloumn: http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html#instance-method-addColumn
```
    return queryInterface.addColumn('Teachers', 'SubjectId', {type: Sequelize.INTEGER})
    .then(()=>{
      queryInterface.addConstraint('Teachers', ['SubjectId'], {
        type: 'FOREIGN KEY',
        references: { //Required field
          table: 'Subjects',
          field: 'id'
        }
      })
    })
```
10.3 db:migrate
```
sequelize db:migrate
```
11. Gabung Teacher dengan Subject
11.1 set asociate
pada models/subject.js
```
  // Class Method
  Subject.associate = function (models) {
      // ...associate the models
      Subject.hasMany(models.Teacher);
  };
```
pada models/teacher.js
```
  // Class Method
  Teacher.associate = function (models) {
      // ...associate the models
      Teacher.belongsTo(models.Subject);
  };
```
11.2 seed asociate update table
```
sequelize seed:create --name update-dummy-data
```
11.3 update file seednya menambahkan sumbject id pada Bpk Bambang untuk pelajaran Kimia
```
const models = require('../models');
...
    let updated = {
      SubjectId: 1
    }
    return models.Teacher.update(updated,{where: {id: 1 }})
```
12. update di root untuk menampilkan data Teacher dan Subject yang dia ajar  
12.1 Update /teacher
```
app.get('/teacher', (req,res)=>{
  models.Teacher.findAll({
    include: [ {model: models.Subject } ]
  })
  .then(teachers=>{
    res.send(teachers)
  })
})
```
12.2 Update /subject
```
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
```