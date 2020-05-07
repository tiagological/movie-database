import React, { useState, useContext } from 'react';
import GlobalContext from '../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { login } from '../services/session';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { errors, setErrors, setSession } = useContext(GlobalContext);

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    login(user, setErrors, setSession);
    clearForm();
  };

  return (
    <Container>
      <Title>Login</Title>
      <ErrorText>{errors}</ErrorText>
      <Form onSubmit={handleSubmit}>
        <Label>
          <LabelText>Email:</LabelText>
          <Field
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <Label>
          <LabelText>Password:</LabelText>
          <Field
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Label>
        <Submit type='submit' value='Submit' />
      </Form>
      <StyledLink to='/signup'>Signup</StyledLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h1`
  text-align: center;
`;

const ErrorText = styled.p`
  padding: 10px;
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Label = styled.label`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const LabelText = styled.span`
  margin: 10px 0;
  font-size: 20px;
`;

const Field = styled.input`
  height: 40px;
  border: 1px solid transparent;
  font-size: 20px;

  :focus {
    border: 1px solid black;
    outline: none;
  }
`;

const Submit = styled.input`
  margin: 10px;
  padding: 5px 0;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  margin: 10px;
  text-align: center;
  font-size: 20px;
  border: 1px solid gray;
  padding: 5px 0;
  background-color: buttonface;
`;
