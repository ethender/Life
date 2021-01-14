import React from 'react';
import { Button,Container,Row, Form } from 'react-bootstrap';
import {TaskCreate} from './taskcreate.component';
export const SprintCreate = props => (
    <Container>
        <Row>
        <h1>{props.title}</h1>
        </Row>
        <Row>
            <Form>
                <Form.Group>
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter Sprint Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Description</Form.Label>
                    <Form.Control as="textarea" rows={3}  />
                </Form.Group>
                <Form.Group>
                    
                    <Button onClick={props.handleAddTask}>
                        +
                    </Button>
                    {props.addtask ?
                     <TaskCreate title='Task' 
                     insertNewTask={props.insertNewTask} />
                     :
                     <p>{JSON.stringify(props)}</p>
                    }
                </Form.Group>
                {props.addtask ? 
                '' : 
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                }
            </Form>
        </Row>
    </Container>
);