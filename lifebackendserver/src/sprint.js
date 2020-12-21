const mongoose = require('mongoose');
const CONSTANTS = require('./appconstants');
mongoose.connect(`mongodb://${CONSTANTS.DATABASE_SERVER}:${CONSTANTS.DATABASE_PORT}/${CONSTANTS.DATABASE}`,{useNewUrlParser: true, useUnifiedTopology: true});
/**
 * Task schema
 */
var taskSchema = mongoose.Schema({

    name: String,
    desc: String,
    progress: Number,
    completed: Boolean,
    start:{
        type: Date,
        default: Date.now
    },
    end: Date
});
/**
 * Sprint schema
 */
var sprintSchema = mongoose.Schema({
    name:String,
    desc:String,
    start:{
        type:Date,
        default:Date.now
    },
    end:Date,
    tasksCount:Number,
    progress:Number,
    completed:Boolean,
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }]
});

// Task & Sprint
var Task = mongoose.model('task',taskSchema);
var Sprint = mongoose.model('sprint',sprintSchema);

class SprintORM {


        /**
         * Creates the sprint and inserts the tasks. But not working
         */
        async create(data){
        //console.log("comming to data");
        //console.log(mongoose.connection.readyState);

        let promiseTask = function(resolve,reject){
            this.insertAllTasks(data.tasks).then((tasksdata)=>{
                
                var temp = [];
                Object.keys(tasksdata).forEach(element=>{
                    temp.push(tasksdata[element]);
                });
                var sprint = new Sprint(data);
                sprint.save().then(()=>{
                    resolve(sprint);
                }).catch((err)=>{
                    reject(err);
                });
           }).catch((err)=>{
                reject(err);
           });
        }

       return await new Promise(promiseTask);
        
    }

    /**
     * 
     * @param {Sprint} data 
     * This method should be called to create sprint
     * Warning: must insert after tasks once inserted. Otherwise tasks will update use update method.
     */
    insertSprint(data){
        var promiseSprint = function(resolve,reject){
            var sprint = new Sprint(data);
            sprint.save().then(()=>{
                resolve(sprint);
            }).catch((err)=>{
                reject(err);
            });
        }
        return new Promise(promiseSprint);
    }

    /**
     * This method used to get sprint completed tag
     * @param {Sprint} completed 
     */
    async getSprintsByCompleted(completed){
        var records = await Sprint.find().where('completed').in(completed).exec();
        console.log(records);
        return records;

    }

    /**
     * This method will update the sprint
     * @param {Sprint} sprint 
     */
    async updateSprint(sprint){
        const filter = {"_id":sprint._id};
        delete sprint["_id"];
        let doc = await Sprint.findOneAndUpdate(filter,sprint,{new:true});
        return doc;
    }
    

    

    /**
     * This method will insert the tasks array
     * @param {[Task]} tasks 
     */
    //https://www.tutorialkart.com/nodejs/mongoose/insert-multiple-documents-to-mongodb/
     insertAllTasks(tasks){
        var promiseTask = function(resolve,reject){
            Task.collection.insertMany(tasks,function(err,docs){
                if(err){
                    reject(err);
                }else{
                    resolve(docs.insertedIds);
                }
            });
        }
        return new Promise(promiseTask);
    }

    /**
     * This method will single task
     * @param {Task} task 
     */
    singleTask(task){
        var promiseTask = function(resolve,reject){
            var temp = new Task(task);
            temp.save().then(()=>{
                resolve(temp._id);
            }).catch(()=>{
                reject("task not saved");
            });
            return;
        }
        return new Promise(temp);
    }

    /**
     * This method will give array of tasks
     * @param {Task} arr 
     */
    async getTasks(arr){

        Task.findByIdAndUpdate
        var records = await Task.find().where('_id').in(arr).exec();
        console.log(records);
        return records;
    }

    /**
     * This will update single task
     * @param {Task} task 
     */
    async updateTask(task){
        const filter = {"_id":task._id};
        delete task["_id"];
        let doc = await Task.findOneAndUpdate(filter,task,{new:true});
        return doc;
    }

   

}

module.exports = SprintORM;