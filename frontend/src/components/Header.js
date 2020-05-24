import React, { useContext } from 'react';
import GlobalContext from '../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { logout } from '../services/session';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

export const Header = () => {
  const {
    isLoggedIn,
    isMenuActive,
    setIsMenuActive,
    currentScreen,
    setSession,
    setErrors,
    setIsLoggedIn,
    setToastStatus,
  } = useContext(GlobalContext);

  const toggleNavbar = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLogout = () => {
    logout(setSession, setErrors, setIsLoggedIn, setToastStatus);
  };

  return (
    <Container>
      <Nav>
        <Placeholder />
        <Link to='/' style={{ display: 'flex' }}>
          <StyledLogo />
        </Link>
        <DesktopLinksContainer>
          <DesktopLink to='/' isActive={currentScreen === 'home'}>
            home
          </DesktopLink>
          {!isLoggedIn && (
            <>
              <DesktopLink to='/login' isActive={currentScreen === 'login'}>
                login
              </DesktopLink>
              <DesktopLink to='/signup' isActive={currentScreen === 'signup'}>
                signup
              </DesktopLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <DesktopLink
                to='/dashboard'
                isActive={currentScreen === 'dashboard'}>
                dashboard
              </DesktopLink>
              <DesktopLogoutButton onClick={handleLogout}>
                logout
              </DesktopLogoutButton>
            </>
          )}
        </DesktopLinksContainer>
        <HamburgerContainer onClick={toggleNavbar}>
          <HamburgerIconContainer isMenuActive={isMenuActive}>
            <HamburgerIcon isMenuActive={isMenuActive} />
          </HamburgerIconContainer>
        </HamburgerContainer>
      </Nav>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 2rem 0;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (min-width: 1024px) {
    padding: 0 3rem;
  }
`;

const Placeholder = styled.div`
  margin-right: auto;
  width: 6rem;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const StyledLogo = styled(Logo)`
  width: 15rem;
  height: auto;
  position: relative;
  z-index: 20;

  > path {
    fill: #fff;
  }
`;

const DesktopLinksContainer = styled.div`
  display: none;

  @media only screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`;

const DesktopLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  margin-right: 2rem;
  color: #fff;
  font-family: 'Roboto';
  font-size: 2rem;
  position: relative;

  ::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -1rem;
    border-radius: 10px;
    height: 3px;
    width: ${({ isActive }) => (isActive ? '100%' : 0)};
    background: linear-gradient(90deg, paleturquoise, turquoise);
    transition: 300ms ease;
  }

  :hover {
    ::after {
      width: 100%;
    }
  }
`;

const DesktopLogoutButton = styled.button`
  margin-right: 2rem;
  color: #fff;
  font-family: 'Roboto';
  font-size: 2rem;
  position: relative;
  background: transparent;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const HamburgerContainer = styled.div`
  position: relative;
  z-index: 20;
  height: auto;
  width: 6rem;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const HamburgerIconContainer = styled.div`
  width: 50%;
  ::before,
  ::after {
    content: '';
    display: block;
    height: 2px;
    margin: 10px 0;
    background-color: #fff;
    transition: all 200ms;
  }
  ::before {
    transform: ${({ isMenuActive }) =>
      isMenuActive ? 'translateY(12px) rotate(-45deg)' : 'rotate(0deg)'};
  }
  ::after {
    transform: ${({ isMenuActive }) =>
      isMenuActive ? 'translateY(-12px) rotate(45deg) ' : 'rotate(0deg)'};
  }
`;

const HamburgerIcon = styled.div`
  height: 2px;
  margin: 10px 0;
  display: block;
  background-color: #fff;
  transform: ${({ isMenuActive }) => (isMenuActive ? 'scale(0)' : 'scale(1)')};
  transition: all 200ms;
`;
