import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signup } from '../services/session';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { errors, setErrors, setSession } = useContext(GlobalContext);

  useEffect(() => {
    if (errors) {
      setErrors('');
    }
  }, []);

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    signup(user, setErrors, setSession);
    clearForm();
  };

  return (
    <Container>
      <InnerContainer>
        <Title>Sign Up</Title>
        <ErrorText>{errors}</ErrorText>
        <Form onSubmit={handleSubmit}>
          <Label>
            <LabelText>Username</LabelText>
            <Field
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Label>
          <Label>
            <LabelText>Email</LabelText>
            <Field
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Label>
          <Label>
            <LabelText>Password</LabelText>
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
        <LoginTextContainer>
          Already have an account? <StyledLink to='/login'>Login</StyledLink>
        </LoginTextContainer>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 1) 75%,
    rgba(98, 98, 98, 1) 100%
  );
  background-repeat: no-repeat;
  overflow: auto;
  color: #fff;
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
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
  border: 3px solid transparent;
  font-size: 20px;
  padding: 0 1rem;

  :focus {
    border: 3px solid turquoise;
    outline: none;
  }
`;

const Submit = styled.input`
  margin: 10px;
  padding: 5px 0;
  font-size: 20px;
  background: transparent;
  color: #fff;
  border: 1px solid white;
  border-radius: 8px;

  :hover {
    cursor: pointer;
  }
`;

const LoginTextContainer = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-size: 2rem;

  :hover {
    text-decoration: underline;
  }
`;
