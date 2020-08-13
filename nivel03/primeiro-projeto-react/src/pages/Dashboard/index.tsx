import React, { useState, useCallback, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const DashBoard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [newRepo, setNewRepo] = useState('');

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('newRepo :>> ', newRepo);
      const response = await api.get<Repository>(`/repos/${newRepo}`);
      console.log('response :>> ', response);
      const repository = response.data;
      setRepositories(previousState => [...previousState, repository]);
      setNewRepo('');
    },
    [newRepo],
  );

  const handleInputChange = useCallback(event => {
    setNewRepo(event.target.value);
  }, []);

  return (
    <>
      <img src={logoImage} alt="Github explorer" />
      <Title>Dashboard</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={handleInputChange}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default DashBoard;
