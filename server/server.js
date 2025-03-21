const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// Import routes
const addAttendance = require('./routers/attendanceRoutes');
const studentRoutes = require('./routers/studentRoutes');  // นำเข้า routes ของนักศึกษา


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/api', addAttendance);  // เส้นทางสำหรับผู้ใช้
app.use('/api', studentRoutes);  // ตั้งเส้นทาง API



app.listen(5000 , () => console.log('server is Running on port 5000'))