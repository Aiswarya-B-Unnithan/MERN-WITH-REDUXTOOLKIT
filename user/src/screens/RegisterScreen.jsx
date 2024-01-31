import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import "./RegisterScreen.css";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/");
    }
  }, [navigate]);

  const isNameValid = /^[A-Za-z\s]+$/.test(name); // Alphabets and spaces only
  const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
    password
  ); // At least 6 characters, including a number and a special character

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
    } else if (!isNameValid) {
      toast.error("Name must contain only alphabets");
    } else if (!isPasswordValid) {
      toast.error(
        "Password must have at least 6 characters, including a number and a special character"
      );
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Registered successfully!");
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center mb-4">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        {isLoading && <Loader />}
        <Button
          type="submit"
          variant="primary"
          className="w-100 mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>

        <Row className="py-3">
          <Col>
            Already a customer? <Link to="/login">Login here</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
