import React from 'react';
import styled from 'styled-components/macro';
import { Header, Footer } from '../components';

export const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Main = styled.main`
  flex-grow: 1;
  flex-shrink: 0;

  @media only screen and (min-width: 1024px) {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 5px;
  }
`;
