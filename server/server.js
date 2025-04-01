const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// Import routes
const teacherRoutes = require("./routers/teacherRoutes");
const courseRoutes = require("./routers/courseRoutes");
const studentRoutes = require("./routers/studentRoutes");
const classroomRoutes = require("./routers/classroomRoutes");
const studentCheckRoutes = require("./routers/studentCheckRoutes");
const addminRouters = require("./routers/addminRouters");


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use("/api", teacherRoutes); // done
app.use("/api", studentRoutes); // done
app.use("/api", studentCheckRoutes); // done
app.use("/api", courseRoutes); // done
app.use("/api", classroomRoutes); // done
app.use("/api", addminRouters );
// Admin

app.listen(5000 , () => console.log('server is Running on port 5000'))