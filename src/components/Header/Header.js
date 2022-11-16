import styled from "styled-components";

const HeaderWrapper = styled.div`
  font-family: Trebuchet MS;
  background-color: #0e81ac;
  display: inline-block;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #e3e6fd;
  margin: 0;
`;

const Title = styled.h1`
  pointer-events: none;
`;

const Img = styled.img`
  margin-top: 20px;
  float: left;
  height: 100px;
`;


const Header = () => {
  return (
    <HeaderWrapper>
        <Img src='shopping.png' alt='liste-courses' />
        <Title>Liste de courses</Title>
    </HeaderWrapper>
  )
}

export default Header