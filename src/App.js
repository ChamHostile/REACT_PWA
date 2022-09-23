import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';



function Todo({ todo, index, markTodo, removeTodo, updateTodo, updateTxt }) {
  return (
    <div
      className="todo"
    >
      <Row>
        <Col>
        <Form.Control disabled={!todo.update} style={{ textDecoration: todo.isDone ? "line-through" : "" , "border": 0}}  value={todo.text} className="inline" onChange={e=>updateTxt(e.target.value, index)}/>
        </Col>
       
      </Row>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-warning" onClick={() => updateTodo(index)}>Update</Button>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Todo Input</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Ajouter
    </Button>
  </Form>
  );
}



function App() {
  const [todos, setTodos] = React.useState([]);
  const [filteredTodos, setFilteredTodos] = React.useState([]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
    setFilteredTodos(newTodos);

  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setFilteredTodos(newTodos);

  };
  const updateTodo = index => {
    const newTodos = [...todos];
    newTodos[index].update = true;
    setTodos(newTodos);
    setFilteredTodos(newTodos);

  }
  const updateTxt = (text, index) => {
    const newTodos = [...todos];
    newTodos[index].text = text;
    setTodos(newTodos);
    setFilteredTodos(newTodos);

  }
  const deleteAll = () => {
    setTodos([]);
    setFilteredTodos([]);
  }
  const deleteFinished = () => {
    const newTodos = [...todos];
    console.log(newTodos.filter((val) => !val.isDone))
    let filteredTodos = newTodos.filter((val) => !val.isDone);
    setTodos(filteredTodos);
    setFilteredTodos(newTodos);

        // setTodos(newTodos);
  }
  const filterTodo = type => {
    const allTodos = [...todos];
    let newTodos = allTodos;
    if (type === "todo") {
       newTodos = allTodos.filter((val) => !val.isDone);
    } else if (type === "done") {
       newTodos = allTodos.filter((val) => val.isDone);
    } else {
       newTodos = []
    }
    setFilteredTodos(newTodos);
    console.log(filteredTodos);
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          <Row>
            <Col >
              <Button className="w-100 rounded-0 mb-4" variant="primary" onClick={() => filterTodo()}>Tous</Button>
            </Col>
            <Col>
              <Button className="w-100 rounded-0" variant="primary" onClick={() => filterTodo("todo")}>A faire</Button>
            </Col>
            <Col>
              <Button className="w-100 rounded-0" variant="primary" onClick={() => filterTodo("done")}>Terminé</Button>
            </Col>
          </Row>
          {filteredTodos.length > 0 ? filteredTodos.map((todo, index) => (
            <Card className="mb-3">
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                updateTxt={updateTxt}
                />
              </Card.Body>
            </Card>
          )) : todos.map((todo, index) => (
            <Card className="mb-3">
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                updateTxt={updateTxt}
                />
              </Card.Body>
            </Card>
          ))
          }
          
        </div>
        <div>
          <Button variant="danger" onClick={() => deleteAll()}>Tous supprimer</Button>
          <Button variant="danger" className="m-2" onClick={() => deleteFinished()}>Supprimer finis</Button>
        </div>
      </div>
    </div>
  );
}

export default App;