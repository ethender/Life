import React from 'react';
import { Button,Container,Row, Col, ButtonGroup, Form } from 'react-bootstrap';
//import Request from 'requests';

import constants from '../../constants';

/*
https://developer.mozilla.org/en-US/docs/Web/API/Request
*/
class SprintBasic extends React.Component{


    constructor(){
        super();
        this.state = {
            tasks:[],
            sprint:{},
            whichContainer:1
        }


        /*
            Functions binding
        */
       this.openContianer = this.openContianer.bind(this);
       this.sprintSubmit = this.sprintSubmit.bind(this);
       this.taskFormSubmit = this.taskFormSubmit.bind(this);
       this.clearTasks = this.clearTasks.bind(this);
       this.renderTasksLoaded = this.renderTasksLoaded.bind(this);
       this.processTasks = this.processTasks.bind(this);
       this.syncTasksToDB = this.syncTasksToDB.bind(this);
    }

    openContianer(event){
        var value = parseInt(event.target.attributes.getNamedItem('data-key').value);
        this.setState({
            whichContainer:value
        });
    }

    sprintSubmit(event){
        event.preventDefault();
        console.log("comming");
        const formData = new FormData(event.target);
        console.log(formData.get('sprintname'));
        alert(formData.get('sprintname'));
        
    }

    processTasks(){
        var proceed = true;
        for(var index in this.state.tasks){
            console.log(JSON.stringify(this.state.tasks[index]));
            if(this.state.tasks[index].hasOwnProperty('_id')){
                proceed = false;
            }
        }
        if(proceed){
            this.syncTasksToDB();
        }else{
            alert('Some / All tasks are synced to db. Please remove tasks first.');
        }
    }

    syncTasksToDB(){
        var url = 'http://'+constants.server+":"+constants.port+'/tasks';
        var taskBody = {
            'tasks':this.state.tasks
        }

        var params = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(taskBody)
        }
        console.log(url);
        console.log(JSON.stringify(params));
        var request = new Request(url,params);
        fetch(request).then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw Error(`Request failed with status ${res.status}`);
            }
        })
        .then(res=>{
            console.log(res);
            this.setState({
                tasks:res.tasks
            });
        }).catch(err=>{
            console.log(err);
        });
    }


    taskFormSubmit(event){
        event.preventDefault();
        console.log("comming o tasks");
        const formData = new FormData(event.target);
        var temp = {
            "name": formData.get("taskname"),
            "desc":formData.get("taskdesc"),
            "progress":0.0,
            "completed":false
        }
        console.log(temp);
        var tasksArrTemp = this.state.tasks;
        tasksArrTemp.push(temp);
        console.log(tasksArrTemp);

        this.setState({
            tasks: tasksArrTemp
        });
        event.target.reset();
    }

    clearTasks(){
        this.setState({
            tasks:[]
        });
    }

    renderTasksLoaded(){
        var tasksItems = [];
        if(this.state.tasks.length > 0){
            
            for(var value of this.state.tasks){
                var isSynced = value.hasOwnProperty('_id') ?  'Yes' : 'No';
                tasksItems.push(
                    <tr>
                        <td>{value.name}</td>
                        <td>{value.desc}</td>
                        <td>{value.progress}</td>
                        <td>{""+value.completed}</td>
                        <td>{isSynced}</td>
                    </tr>
                );
            }
        }else{
            tasksItems.push(
                <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                </tr>
            );
        }
        return tasksItems;
    }

    

    render(){

        var tasksItems = this.renderTasksLoaded();
        
        return(
            <Container>
                { /*
                    Header
                */}
                <Container>
                    <Row>
                        <ButtonGroup onClick={this.openContianer} aria-label="Sprint Row">
                            <Button data-key='0' variant="primary">Sprint</Button>
                            <Button data-key='1' variant="secondary">Task</Button>
                            <Button data-key='2' variant="secondary">Sprints Show</Button>
                        </ButtonGroup>
                    </Row>
                </Container>

                {
                    /*  Sprint Row */
                }
                {
                    this.state.whichContainer === 0 ? 
                    <Container>
                        <h1>Sprint Create</h1>
                        <Form onSubmit={this.sprintSubmit}>
                            <Form.Group>
                                <Form.Label>Name </Form.Label>
                                <Form.Control type="text" name="sprintname" placeholder="Enter Sprint Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Enter Description</Form.Label>
                                <Form.Control name="sprintdesc" as="textarea" rows={3}  />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Container> : ''
                }
                
                {
                    /*  Tasks Row */
                }
                {
                    this.state.whichContainer === 1 ? 
                    <Container>
                        <Row>
                            <h1>Task Create</h1>
                        </Row>
                        <Row>
                            <Form onSubmit={this.taskFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Name </Form.Label>
                                    <Form.Control type="text" name="taskname"  placeholder="Enter Task Name" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Enter Description</Form.Label>
                                    <Form.Control name="taskdesc" as="textarea" rows={3}  />
                                </Form.Group>
                                <Button variant="primary" type="submit">Add</Button>
                            </Form>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    <table>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Progress</th>
                                            <th>Completed</th>
                                            <th>Synced</th>
                                        </tr>
                                        {tasksItems}
                                    </table>
                                </p>
                            </Col>
                            <Col>
                                <Button onClick={this.clearTasks}>Clear Tasks</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={this.processTasks}>Push All To DB</Button>
                        </Row>
                    </Container> : ''
                }
                {
                    /*  Sprints show */
                }
               {
                    this.state.whichContainer === 2 ? 
                    <Container>
                        <h1>SprintView Create</h1>
                    </Container> : ''
                }
            </Container>
            
        );
    }
}

export default SprintBasic;