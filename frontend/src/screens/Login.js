import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../context';
import { Link } from 'react-router-dom';
import { Layout } from '../components';
import styled from 'styled-components/macro';
import { login } from '../services/session';
import Helmet from 'react-helmet';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    errors,
    setErrors,
    setSession,
    setIsLoggedIn,
    setCurrentScreen
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentScreen('login');
  }, []);

  useEffect(() => {
    if (errors) {
      setErrors('');
    }
  }, []);

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value
    };
    await login(user, setErrors, setSession, setIsLoggedIn);
    clearForm();
    setSubmitting(false);
  };

  const submitButtonValue = isSubmitting ? 'Logging in...' : 'Log in';

  return (
    <Container>
      <Helmet>
        <title>Login | Movie DB</title>
        <meta
          name='description'
          content='Log in to your account to start adding to your watchlist!'
        />
      </Helmet>
      <Layout>
        <InnerContainer>
          <Title>Log In</Title>
          <ErrorText>{errors}</ErrorText>
          <Form onSubmit={handleSubmit}>
            <Label>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
            <Label>
              <Field
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Label>
            <Submit
              type='submit'
              value={submitButtonValue}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
            />
          </Form>
          <SignUpTextContainer>
            {`Don't yet have an account? `}
            <StyledLink to='/signup'>Sign Up</StyledLink>
          </SignUpTextContainer>
        </InnerContainer>
      </Layout>
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
    rgba(0, 0, 0, 1) 0%,
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
  font-weight: initial;
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
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Field = styled.input`
  height: 5rem;
  border: 3px solid #fff;
  outline: none;
  font-size: 2rem;
  padding: 0 1rem;

  :focus {
    border: 3px solid turquoise;
    outline: none;
  }
`;

const Submit = styled.input`
  margin: 2rem;
  padding: 1.5rem 0;
  font-size: 2rem;
  background: transparent;
  color: #fff;
  border: 1px solid white;
  border-radius: 8px;
  opacity: ${({ isSubmitting }) => (isSubmitting ? 0.5 : 1)};

  :hover {
    cursor: ${({ isSubmitting }) => (isSubmitting ? 'not-allowed' : 'pointer')};
  }

  :focus {
    outline: 3px solid turquoise;
  }
`;

const SignUpTextContainer = styled.div`
  margin: 2rem 0;
  font-size: 2rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-size: 2rem;
  text-decoration: underline;

  :hover {
    text-decoration-color: turquoise;
    color: turquoise;
  }
`;
