import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    console.log(user);
    clearForm();
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          <LabelText>Email:</LabelText>
          <Field
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <Label>
          <LabelText>Password:</LabelText>
          <Field
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
