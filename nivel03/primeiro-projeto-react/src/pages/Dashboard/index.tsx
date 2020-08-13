import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

const DashBoard: React.FC = () => {
  return (
    <>
      <img src={logoImage} alt="Github explorer" />
      <Title>Dashboard</Title>

      <Form>
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/11494727?s=460&u=11f464c9901a87f930435eeb54c94ca09f211e96&v=4"
            alt="Alan"
          />
          <div>
            <strong>eventMacros</strong>
            <p>All the macros made with eventMacro by me.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/11494727?s=460&u=11f464c9901a87f930435eeb54c94ca09f211e96&v=4"
            alt="Alan"
          />
          <div>
            <strong>eventMacros</strong>
            <p>All the macros made with eventMacro by me.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/11494727?s=460&u=11f464c9901a87f930435eeb54c94ca09f211e96&v=4"
            alt="Alan"
          />
          <div>
            <strong>eventMacros</strong>
            <p>All the macros made with eventMacro by me.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default DashBoard;
