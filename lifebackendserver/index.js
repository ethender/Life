const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const SprintORM = require('./src/sprint')
const CONSTANTS = require('./src/appconstants');



/**
 * Introduction Message will be printed
 */
app.get('/',function(req,res){
    res.json({'Message':'Welcome to Life Backend Server'});
});



/**
 * Sprint & Tasks insert
 */
app.post("/totalsprint",function(req,res){
    
    var body = req.body;
    body.taskcount = body.tasks.length;
    body.start = new Date

    body.tasks.forEach((task) => {
        task.start= new Date
    });
    var sprint = new SprintORM();
    sprint.create(body).then((data)=>{
        res.status(201).json(body);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});



/**
 * Creates the sprint
 */
app.post("/sprint",(req,res)=>{
    var body = req.body;
    body.taskcount = body.tasks.length;
    body.start = new Date

    var sprint = new SprintORM();
    sprint.insertSprint(body).then((data)=>{
        res.status(200).json(body);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

/**
 * Retrives the sprints which are open. 
 */
app.get("/sprint/open",(req,res)=>{
    res.setHeader('Content-Type','application/json');
    var sprint = new SprintORM();
    sprint.getSprintsByCompleted(false).then((records)=>{
        res.status(200).json(records);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

/**
 * Retrives the sprints which are close.
 */
app.get("/sprint/close",(req,res)=>{
    res.setHeader('Content-Type','application/json');
    var sprint = new SprintORM();
    sprint.getSprintsByCompleted(true).then((records)=>{
        res.status(200).json(records);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

/**
 * sprint which updated
 */
app.put("/sprint/update",(req,res)=>{
    var body = req.body;
    var sprint = new SprintORM();
    sprint.updateSprint(body).then((sprint)=>{
        res.status(200).json(sprint);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

/**
 * Tasks will be created
 */
app.post("/tasks",(req,res)=>{
    var body = req.body;
    body.tasks.forEach((task)=>{
        task.start = new Date
    });
    var sprint = new SprintORM();
   sprint.insertAllTasks(body.tasks).then((data)=>{
        res.status(200).json(body);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

/**
 * Retrives the tasks
 */
app.get("/tasks",(req,res)=>{
    var body = req.body;
    var sprint = new SprintORM();
    sprint.getTasks(body.tasks).then((records)=>{
        res.status(200).json(records);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

/**
 * update the task
 */
app.put("/task/update",(req,res)=>{
    var body = req.body;
    var sprint = new SprintORM();
    sprint.updateTask(body).then((task)=>{
        res.status(200).json(task);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});



app.listen(CONSTANTS.SERVERPORT);