import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import GlobalContext from '../context';
import { logout } from '../services/session';

export const NavMenu = () => {
  const {
    isLoggedIn,
    isMenuActive,
    setIsMenuActive,
    setSession,
    setErrors,
    setIsLoggedIn,
    setToastStatus,
  } = useContext(GlobalContext);

  const history = useHistory();

  const navigateToRoute = (route) => {
    setIsMenuActive(!isMenuActive);
    history.push(route);
  };

  const handleLogout = () => {
    logout(setSession, setErrors, setIsLoggedIn, setToastStatus);
    setIsMenuActive(!isMenuActive);
  };

  return (
    <Container isMenuActive={isMenuActive}>
      <LinkContainer>
        <StyledLink onClick={() => navigateToRoute('/')}>home</StyledLink>
        {!isLoggedIn && (
          <>
            <StyledLink onClick={() => navigateToRoute('/login')}>
              login
            </StyledLink>
            <StyledLink onClick={() => navigateToRoute('/signup')}>
              sign Up
            </StyledLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <StyledLink onClick={() => navigateToRoute('/dashboard')}>
              dashboard
            </StyledLink>
            <LogoutButton onClick={handleLogout}>log out</LogoutButton>
          </>
        )}
      </LinkContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: ${({ isMenuActive }) => (isMenuActive ? 'visible' : 'hidden')};
  opacity: ${({ isMenuActive }) => (isMenuActive ? 1 : 0)};
  height: 100vh;
  width: 100%;
  padding-top: 8.6rem;
  background-color: #000;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: 300ms ease;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const LinkContainer = styled.div`
  margin-top: -8.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.button`
  margin: 2rem 0;
  font-size: 2.5rem;
  background: transparent;
  border: none;
  color: #fff;
  outline: none;

  :hover {
    cursor: pointer;
  }
`;

const LogoutButton = styled.button`
  margin: 2rem 0;
  color: #fff;
  font-family: 'Roboto';
  font-size: 2.5rem;
  position: relative;
  background: transparent;
  border: none;
  outline: none;
`;
