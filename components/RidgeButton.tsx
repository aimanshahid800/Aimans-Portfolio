"use client"

import styled from "styled-components"

const RidgeButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        {children}
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    padding: 12px 35px;
    background: transparent;
    border: 2px solid #ff2d78;
    color: #ff2d78;
    font-size: 17px;
    font-weight: 600;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    z-index: 1;
  }

  button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #ff2d78;
    transition: width 0.4s ease;
    z-index: -1;
  }

  button:hover {
    color: #fff;
    box-shadow: 0 0 20px #ff2d7880;
  }

  button:hover::before {
    width: 100%;
  }
`

export default RidgeButton
