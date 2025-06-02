import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const HomePage = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.random().toString(),
      amount,
      description,
      category,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <Card className="p-3 mt-4">
            <h4>Add Daily Expense</h4>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="expenseAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="expenseDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="expenseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Salary</option>
                  <option>Entertainment</option>
                  <option>Others</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit">Add Expense</Button>
            </Form>

          </Card>
        </Col>
        <Col lg={6}>
        <h5 className="mt-4">Expenses</h5>
            {expenses.length === 0 ? (
              <p>No expenses added yet.</p>
            ) : (
              <ListGroup>
                {expenses.map((exp) => (
                  <ListGroup.Item key={exp.id}>
                    ₹{exp.amount} - {exp.description} ({exp.category})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage; // import React from 'react'
// import { Col, Container, Row } from 'react-bootstrap'

// const HomePage = () => {
//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h2>Welcome to Expense-Tracker </h2>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default HomePage
