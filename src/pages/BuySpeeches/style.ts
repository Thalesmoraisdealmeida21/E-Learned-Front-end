import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;

  @media (max-width: 700px) {
    margin: auto 10vw;
  }

  padding: 30px 0;
  max-width: 100vw;

  h1 {
    padding: 50px;
    font-size: 48px;
  }
`;

export const Speeches = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ItemList = styled.div`
  width: 400px;
  margin: 15px;
  height: 400px;
  left: 141px;
  top: 300px;
  padding: 20px;
  cursor: pointer;
  h3 {
    transition: 1s;
    margin-top: auto;
  }

  p {
    display: none;
    height: 250px;
    overflow: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 3px;
      background: #fbfbfb;
      color: #000;
    }

    ::-webkit-scrollbar-thumb {
      background: #757575;
    }
  }

  background: #f9f8f8;
  border: transparent;
  text-align: center;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  transition: 0.5s ease-out;

  button {
    height: 50px;
    border: 1px solid #4d96ca;
    padding: 5px;
    border-radius: 8px;
  }

  &:hover {
    background: #4d96ca;
    color: white;

    h3 {
      color: white;
      font-size: 32px;
    }

    h2 {
      display: none;
    }

    svg {
      display: none;
    }

    p {
      display: block;
    }
  }

  div {
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin-top: auto;
    margin-bottom: 100px;
    margin-left: 16px;
    text-align: center;
  }

  h3 {
    color: green;
    margin-left: 16px;
    margin-top: auto;
  }

  > svg {
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
  }
`;

export const AddToCartButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 32px;
  transition: 0.7s;
  text-align: center;

  svg {
    text-align: center;
    margin: 0 auto;
  }
  div {
    display: flex;
    flex-direction: row;
  }

  button {
    margin: 15px;
    height: 30px;
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
    position: inherit;
    border-bottom: 1px dotted black;

    display: inline-block;

    &:hover {
      span {
        visibility: visible;
      }
    }
  }

  a {
    margin: 15px;
    height: 30px;
    font-size: 12px;
    text-decoration: none;
    color: #3f51b5;
  }
`;

export const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
`;
