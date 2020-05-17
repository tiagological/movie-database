import React, { useContext, useEffect, useRef } from 'react';
import GlobalContext from '../context';
import styled from 'styled-components/macro';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

export const Toast = () => {
  const {
    toastStatus: { isActive, type, message },
    setToastStatus,
  } = useContext(GlobalContext);

  const defaultStatus = {
    isActive: false,
    type: null,
    message: null,
  };

  // save ref to original timer

  const timerRef = useRef(null);

  const setExitTimer = () => {
    timerRef.current = setTimeout(() => setToastStatus(defaultStatus), 5000);
  };

  useEffect(() => {
    if (isActive) {
      setExitTimer();
    }
  }, [isActive]);

  const closeButtonHandler = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToastStatus(defaultStatus);
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      default:
        return null;
    }
  };

  const renderedIcon = renderIcon(type);

  return (
    <Container isActive={isActive}>
      {renderedIcon}
      <TextContainer>
        <Text>{message}</Text>
      </TextContainer>
      <CloseButton onClick={closeButtonHandler} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: ${({ isActive }) => (isActive ? '1rem' : '-10rem')};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  left: 0;
  right: 0;
  margin: 0 auto;
  background: turquoise;
  color: #fff;
  width: 90%;
  min-height: 6rem;
  border-radius: 8px;
  z-index: 20;
  transition: 300ms ease-in-out;

  @media only screen and (min-width: 1024px) {
    padding: 0 1rem;
  }
`;

const SuccessIcon = styled(FaRegCheckCircle)`
  flex-shrink: 0;
  height: 3rem;
  width: auto;
  margin: 0 auto 0 1rem;
`;

const TextContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const Text = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const ErrorIcon = styled(FaExclamationTriangle)`
  height: 3rem;
  width: auto;
  margin: 0 auto 0 1rem;
`;

const CloseButton = styled(IoIosClose)`
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: auto;
  height: 3rem;
  width: auto;

  :hover {
    cursor: pointer;
  }
`;
