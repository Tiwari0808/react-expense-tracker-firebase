import axios from "axios";
import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Card,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";

const URL =
  "https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses.json";

const HomePage = () => {
  // Controlled inputs for form fields
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("Food");

  const [expenses, setExpenses] = useState([]);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch expenses on mount
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.get(URL);
        const data = res.data;
        const loadedExpenses = [];
        for (let key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        setExpenses(loadedExpenses);
      } catch (error) {
        toast.error("Failed to load expenses");
      }
    };
    getExpenses();
  }, []);

  // Handler to populate form fields for editing
  const editHandler = (expense) => {
    setIsEditing(true);
    setEditId(expense.id);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  // Submit handler to add or update expense
  const submitHandler = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
    };

    try {
      if (isEditing) {
        // Update existing expense
        const res = await axios.put(
          `https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses/${editId}.json`,
          expenseData
        );

        if (res.status === 200) {
          toast.success("Expense updated successfully");
          setExpenses((prev) =>
            prev.map((exp) =>
              exp.id === editId ? { id: editId, ...expenseData } : exp
            )
          );
          setIsEditing(false);
          setEditId(null);
        }
      } else {
        // Add new expense
        const res = await axios.post(URL, expenseData);
        if (res.status === 200) {
          const id = res.data.name; // Firebase returns the new id here
          toast.success("Expense added successfully");
          setExpenses((prev) => [...prev, { id, ...expenseData }]);
        }
      }

      // Reset form fields after add/update
      setAmount('');
      setDescription('');
      setCategory('Food');
    } catch (error) {
      toast.error("Failed to save Expense");
    }
  };

  // Delete handler remains unchanged
  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      if (res.status === 200) {
        toast.success("Expense deleted Successfully");
        setExpenses((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <Card className="p-3 mt-4">
            <h4>{isEditing ? "Edit Expense" : "Add Daily Expense"}</h4>
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
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Salary</option>
                  <option>Entertainment</option>
                  <option>Others</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit">
                {isEditing ? "Update Expense" : "Add Expense"}
              </Button>
              {isEditing && (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => {
                    setIsEditing(false);
                    setEditId(null);
                    setAmount('');
                    setDescription('');
                    setCategory('Food');
                  }}
                >
                  Cancel Edit
                </Button>
              )}
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
                  <Button
                    variant="outline-warning"
                    className="mx-2"
                    onClick={() => editHandler(exp)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteHandler(exp.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
 
