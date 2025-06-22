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
import "./homepage.css";
import ExpensesChart from "../components/ExpensesChart";
import { fetchData } from "../store/profileSlice";
import { getuserIdFromToken } from "../store/utils";

const HomePage = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user_id = getuserIdFromToken(token);
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isPremiumActive = useSelector((state) => state.expenses.isPremiumActive);
  const Firebase_url = `https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses/${user_id}.json`;
  const downloadExpensesCSV = () => {
    const csvContent = [
      "Amount,Description,Date",
      ...expenses.map(
        (exp) => `"${exp.amount}","${exp.description}","${exp.date}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const activatePremiumHandler = () => {
    dispatch(expenseActions.activatePremium());
    toast.success("Premium features activated!");
  };

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
        dispatch(fetchData(token));
      } catch (error) {
        console.log(error);
        toast.error("Failed to load expenses");
      }
    };
    getExpenses();
  }, [isLoggedIn, dispatch]);

  const editHandler = (expense) => {
    setIsEditing(true);
    setEditId(expense.id);
    setAmount(expense.amount);
    setDescription(expense.description);
    setDate(expense.date);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      date,
    };

    try {
      if (isEditing) {
        const res = await axios.put(
          `https://expense-tracker-2-c797e-default-rtdb.firebaseio.com/expenses/${editId}.json`,
          expenseData
        );

        if (res.status === 200) {
          dispatch(
            expenseActions.updateExpense({ id: editId, ...expenseData })
          );
          toast.success("Expense updated successfully");
          setIsEditing(false);
          setEditId(null);
        }
      } else {
        const res = await axios.post(Firebase_url, expenseData);
        if (res.status === 200) {
          const id = res.data.name; // Firebase returns the new id here
          dispatch(expenseActions.addExpense({ id: id, ...expenseData }));
          toast.success("Expense added successfully");
        }
      }

      setAmount("");
      setDescription("");
      setDate(() => new Date().toISOString().split("T")[0]);
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
        dispatch(expenseActions.deleteExpense(id));
      }
      toast.success("Expense deleted Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container id="">
      <div id="premium">
        {isPremium && !isPremiumActive && (
          <>
            <p>You have unlocked premium features</p>
            <Button
              size="sm"
              variant="success"
              onClick={activatePremiumHandler}>
              Activate Premium
            </Button>
          </>
        )}
      </div>
      <Row id="row-main">
        <Col id="chart-col" md={4}>
          <Card className="p-4" id="chart">
            <h5>Monthly Expense Summary</h5>
            <ExpensesChart expenses={expenses} />
          </Card>
        </Col>
        <Col md={3} id="add-expense-col">
          <Card className="p-3">
            <h4 id="add-expense-header">
              {isEditing ? "Edit Expense" : "Add Daily Expense"}
            </h4>
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
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
              <div id="btns">
                <Button type="submit" size="sm">
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
                      setDate(() => new Date().toISOString().split("T")[0]);
                    }}>
                    Cancel Edit
                  </Button>
                )}
                {isPremiumActive && (
                  <p id="premium-para">
                    As a premium user you can download the expenses
                  </p>
                )}
              </div>
            </Form>
          </Card>
        </Col>

        <Col className="mt-0" md={5}>
          <div id="expenses_header">
            <h5 className="mt-4">Expenses</h5>
            <h5 className="mt-4">Total Expenses:₹{totalAmount}</h5>
            {isPremiumActive && (
              <Button size="sm" variant="success" onClick={downloadExpensesCSV}>
                Download
              </Button>
            )}
          </div>
          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            <div>
              <ListGroup>
                {expenses.map((exp) => (
                  <ListGroup.Item id="expense-list" key={exp.id}>
                    ₹{exp.amount} - {exp.description} - {exp.date}
                    <div id="expense-btns">
                      <Button
                        size="sm"
                        variant="outline-warning"
                        className="mx-2"
                        onClick={() => editHandler(exp)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteHandler(exp.id)}>
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
