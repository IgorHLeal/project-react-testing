import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('O primeiro link deve possuir o texto Home', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const elementHome = screen.getByRole('link', { name: /Home/i });
      expect(elementHome).toBeDefined();
    });

    it('O segundo link deve possuir o texto About', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const elementAbout = screen.getByRole('link', { name: /About/i });
      expect(elementAbout).toBeDefined();
    });

    it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const elementFavPoke = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(elementFavPoke).toBeDefined();
    });
  });

it('Redirecionar para a página inicial ao clicar no link Home', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkHome = screen.getByRole('link', { name: /Home/i });
  userEvent.click(linkHome);
  const homeHeading = screen.getByText(/Encountered pokémons/i);
  expect(homeHeading).toBeDefined();
});

it('Redirecionar para a página About ao clicar no link About', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkAbout = screen.getByRole('link', { name: /about/i });
  userEvent.click(linkAbout);
  const aboutHeading = screen.getByText(/About Pokédex/i);
  expect(aboutHeading).toBeDefined();
});

it('Redirecionar para a página de Pokémons Favoritos ao clicar no link Favorite Pokémons',
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkFavPoke = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkFavPoke);
    const favPokeHeading = screen.getByText(/Favorite pokémons/i);
    expect(favPokeHeading).toBeDefined();
  });

it('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');
  const notFound = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(notFound).toBeDefined();
});
