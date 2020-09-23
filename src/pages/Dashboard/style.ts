import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  h1 {
    padding: 50px;
    font-size: 48px;
    font-weight: 1000;
  }
  h2 {
    font-weight: 700;
    margin: 10px;
    margin-bottom: 8px;
  }
  p {
    margin-left: 16px;
    max-width: 600px;
    text-align: left;
    overflow: hidden;
  }
`;

export const Speeches = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: white;
  }

  a:hover {
    color: black;
  }
`;

export const ItemList = styled.div`
  width: 100%;
  margin: 15px;

  height: 130px;
  left: 141px;
  top: 300px;

  background: #ffffff;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin-top: 45px;
    margin-left: 16px;
  }

  h3 {
    color: green;
    margin-left: 16px;
    margin-top: 8px;
  }
  button {
    margin-top: auto;
    background: #4d96ca;
    height: 80px;
    border-radius: 50%;
    border: transparent;
    width: 80px;
    margin-top: 20px;

    margin-left: 16px;
    transition: 0.7s;
    color: white;

    &:hover {
      background: white;
      border: silver;
      box-shadow: 1px 1px 10px;
      color: #000;

      button + svg {
        color: #000;
      }
    }

    &:active {
      transition: ease 0.7s;

      background: silver;
    }
  }

  > svg {
    margin-left: auto;
    margin-right: 42px;
    margin-top: 40px;
    cursor: pointer;
  }
`;

export const AddToCartButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 32px;
  transition: 0.7s;
  span {
    font-size: 16px;
  }

  button {
    background: transparent;
    color: black;

    &:hover {
      background: transparent;
      border: transparent;
      box-shadow: none;

      color: #939292;
    }
  }
`;

export const ExpiredContent = styled.div`
  margin-left: auto;
  color: red;
  font-weight: bold;
  margin-right: 32px;
  margin-top: auto;
  margin-bottom: auto;
`;
