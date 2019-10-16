const { Pool } = require('pg');
// const teachers_assisted = require('../4_queries/name_of_teachers_that_assisted.sql');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT teachers.name AS teacher_name, cohorts.name AS cohort_name
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
GROUP BY teachers.name, cohorts.name
HAVING cohorts.name = '${process.argv[2]}'
ORDER BY teachers.name;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort_name} : ${user.teacher_name}`);
  })
});