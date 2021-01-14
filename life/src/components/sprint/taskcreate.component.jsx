import React from 'react';
import { Button,Container,Row, Form } from 'react-bootstrap';


export const TaskCreate = props =>(
<Container>
        <Row>
        <h1>{props.title}</h1>
        </Row>
        <Row>
            <Form>
                <Form.Group>
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter Task Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Description</Form.Label>
                    <Form.Control as="textarea" rows={3}  />
                </Form.Group>
                
                <Button variant="primary" type="submit" onSubmit={props.insertNewTask}>
                    Submit
                </Button>
                
            </Form>
        </Row>
        <Row>
            <p>{JSON.stringify(props)}</p>
        </Row>
    </Container>
);