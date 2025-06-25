import React, { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { FaUndo, FaTrash } from "react-icons/fa";
import { MdDone } from "react-icons/md";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  addTodos,
  deleteTodos,
  fetchTodos,
  updateTodos,
} from "./redux/api/todoThunk";

function App() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const { data, isLoading, error } = useSelector((state) => state.todo);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodos(newTodo));
      setNewTodo("");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4 fs-3">
                Todo List
              </Card.Title>

              <div className="d-flex justify-content-center mb-3">
                <Button
                  variant="primary"
                  onClick={() => dispatch(fetchTodos())}
                >
                  Fetch Todos
                </Button>
              </div>

              <Form
                className="mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTodo();
                }}
              >
                <Row className="g-2">
                  <Col xs={12} sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter new todo"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                       className="custom-focus"
                    />
                  </Col>
                  <Col xs={12} sm={3}>
                    <Button type="submit" variant="success" className="w-100">
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>

              {isLoading ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                  <p>Loading...</p>
                </div>
              ) : error ? (
                <p className="text-center text-danger">{error}</p>
              ) : (
                <ListGroup>
                  {data && data.length > 0 ? (
                    data.map((item) => (
                      <ListGroup.Item
                        key={item.id}
                        className="d-flex justify-content-between align-items-center flex-wrap"
                      >
                        <span
                          className={
                            item.completed ? "text-decoration-line-through" : ""
                          }
                        >
                          {item.todo}
                        </span>
                        <div className="d-flex gap-2 mt-2 mt-sm-0">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              dispatch(
                                updateTodos({
                                  id: item.id,
                                  updatedData: {
                                    completed: !item.completed,
                                  },
                                })
                              )
                            }
                          >
                            {item.completed ? <FaUndo /> : <MdDone />}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => dispatch(deleteTodos(item.id))}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No todos available.</ListGroup.Item>
                  )}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
