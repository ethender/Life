import React from 'react';
import './sprint.component.scss';
import { Button,Container,Row } from 'react-bootstrap';
import {SprintCreate} from './sprintcreate.component';

class Sprint extends React.Component{

    constructor(){
        super();
        this.state = {
            addtask:false,
            tasks: []
        }
        this.handleAddTask = this.handleAddTask.bind(this);
        this.insertNewTask = this.insertNewTask.bind(this);
    }

    handleAddTask(){
        this.setState({
            addtask: !this.state.addtask
        });
    }

    insertNewTask(){
        alert('comming');
        /*var task = {
            'title':'test',
            'desc':'test1',
            'progress':0.0,
            'completed':false
        }
        
        var temp = this.state.tasks.push(task);
        this.setState({
            tasks : temp,
            addtask:false
        });*/
    }


    render(){
        return(
            <Container>
                <Row>
                    <h1>Sprint</h1>
                </Row>
                <Row>
                    <SprintCreate 
                        title="Sprint create"
                        addtask={this.state.addtask}
                        tasks={this.state.tasks}
                        handleAddTask={this.handleAddTask}
                        insertNewTask={this.insertNewTask}
                    />
                </Row>
                
            </Container>
        );
    }

}

export default Sprint;