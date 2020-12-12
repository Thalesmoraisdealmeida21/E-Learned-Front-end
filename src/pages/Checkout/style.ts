import styled from 'styled-components';

export const ContainerDashboard = styled.div`
  margin: auto 15vw;
  position: static;

  padding: 40px 0;
  max-width: 100vw;

  @media (max-width: 750px) {
    margin: auto 0;
  }

  h1 {
    padding: 50px;
    font-size: 48px;
  }

  button {
    height: 60px;
    background: #4d96cb;
    padding: 10px;
    margin-top: 24px;
    border: transparent;
    width: 220px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 75%;
    border-radius: 10px;
  }
`;
export const CardContainerCheckout = styled.div`
  display: flex;
  margin-top: 150px;
  background: #fff;
  padding: 30px;
  form {
    width: 100%;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  select {
    width: 100%;
    padding: 10px;
    height: 50px;
    border: transparent;
    border-radius: 8px;
    background: #eaeaea;
    margin: 10px;
    border: 1px solid silver;
  }
`;

export const DetailsPayment = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  width: 100%;
  strong {
    color: green;
    font-size: 2rem;

    @media (max-width: 800px) {
      font-size: 16px;
      width: 250px;
    }
  }

  button {
    margin-left: 40%;

    @media (max-width: 800px) {
      height: 40px;
      margin-left: 20%;
    }
  }
`;

export const ContainerProfile = styled.div`
  padding: 0 20vw;
  width: 100vw;
  display: flex;
`;

export const ContentProfile = styled.div`
  width: 100%;

  form {
    background: white;
    padding: 30px;
    width: 100%;

    button {
      width: 100%;
      padding: 10px;
      margin-top: 24px;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  select {
    width: 30%;
    padding: 10px;
    height: 50px;
    border: transparent;
    border-radius: 8px;
    background: #eaeaea;
    margin: 10px;
    border: 1px solid silver;
  }
`;

export const TitleSection = styled.h2`
  font-size: 24px;
  font-weight: lighter;
  padding: 10px;
`;

export const PaymentsMethod = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
  }

  span {
    margin: 2px;
  }
`;
