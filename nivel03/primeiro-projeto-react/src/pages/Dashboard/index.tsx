import React from 'react';
import logoImage from '../../assets/logo.svg';
import { Title, Form } from './styles';

const DashBoard: React.FC = () => {
  return (
    <>
      <img src={logoImage} alt="Github explorer" />
      <Title>Dashboard</Title>

      <Form>
        <input type="text" placeholder="Digite o nome do repositório" />
      </Form>
      <button type="submit">Pesquisar</button>
    </>
  );
};

export default DashBoard;
