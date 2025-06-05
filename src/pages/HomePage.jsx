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
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expenseSlice";
import './homepage.css'
import ThemeToggle from '../components/ThemeToggle';

const Firebase_url =
  "https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses.json";

const HomePage = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isPremiumActive = useSelector(state=>state.expenses.isPremiumActive)

  const downloadExpensesCSV = () => {
    const csvContent = [
      'Amount,Description,Category,Date',
      ...expenses.map(exp =>
        `"${exp.amount}","${exp.description}","${exp.category}","${exp.date}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const activatePremiumHandler = () => {
    dispatch(expenseActions.activatePremium());
    toast.success('Premium features activated!')
  }


  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.get(Firebase_url);
        const data = res.data;
        const loadedExpenses = [];
        for (let key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        dispatch(expenseActions.setExpenses(loadedExpenses));
      } catch (error) {
        toast.error("Failed to load expenses");
      }
    };
    getExpenses()

  }, [isLoggedIn, dispatch]);

  const editHandler = (expense) => {
    setIsEditing(true);
    setEditId(expense.id);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
    };

    try {
      if (isEditing) {
        const res = await axios.put(
          `https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses/${editId}.json`,
          expenseData
        );

        if (res.status === 200) {
          toast.success("Expense updated successfully");
          dispatch(
            expenseActions.updateExpense({ id: editId, ...expenseData })
          );
          setIsEditing(false);
          setEditId(null);
        }
      } else {
        const res = await axios.post(Firebase_url, expenseData);
        if (res.status === 200) {
          const id = res.data.name; // Firebase returns the new id here
          toast.success("Expense added successfully");
          dispatch(
            expenseActions.addExpense({ id: res.data.name, ...expenseData })
          );
        }
      }

      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (error) {
      toast.error("Failed to save Expense");
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      if (res.status === 200) {
        toast.success("Expense deleted Successfully");
        dispatch(expenseActions.deleteExpense(id));
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      {isPremium && (
        <div className="premium-features mb-3">
          <Button variant="success" onClick={activatePremiumHandler}>
            Activate Premium
          </Button>

          {isPremiumActive && (
            <div className="mt-2">
              <ThemeToggle />
              <Button variant="info" onClick={downloadExpensesCSV} className="ms-2">
                Download Expenses
              </Button>
            </div>
          )}
        </div>
      )}
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
                  onChange={(e) => setCategory(e.target.value)}>
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
                    setAmount("");
                    setDescription("");
                    setCategory("Food");
                  }}>
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
                    onClick={() => editHandler(exp)}>
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteHandler(exp.id)}>
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
