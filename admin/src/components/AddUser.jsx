import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { addUserdetails } from "../services/api";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const isNameValid = /^[A-Za-z\s]+$/.test(user.name); // Alphabets and spaces only
  const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(
    user.password
  ); // At least 6 characters, including a number and a special character

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const adduserdetails = async () => {
    if (!isNameValid) {
      toast.error("Name must contain only alphabets and spaces");
    } else if (!isPasswordValid) {
      toast.error(
        "Password must have at least 6 characters, including a number and a special character"
      );
    } else {
      try {
        const res = await addUserdetails(user);
        if (res) {
          toast.success("User Created Successfully");
          navigate("/alluser");
        } else {
          toast.error("User already exists");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("User already exists");
        } else {
          // Handle other errors (server errors).
          toast.error(error?.data?.message || error.message);
        }
      }
    }
  };

  return (
    <div>
      <Container>
        <Typography variant="h4">Add User</Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input onChange={onValueChange} name="name" />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input onChange={onValueChange} name="email" />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input onChange={onValueChange} name="password" />
        </FormControl>
        <FormControl>
          <InputLabel>Confirm Password</InputLabel>
          <Input onChange={onValueChange} name="confirmpassword" />
        </FormControl>
        <FormControl>
          <Button onClick={adduserdetails} variant="contained">
            ADD USER
          </Button>
        </FormControl>
      </Container>
    </div>
  );
};

export default AddUser;
