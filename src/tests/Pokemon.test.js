import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  it('Verifica se é renderizado um card com informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    // Acessar o data-testid pelo tipo de pokemon
    // Tentando acessar pelo name nao funcionaou
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonType).toBeDefined();

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight');
    expect(weight).toBeDefined();

    const imgPikachu = screen.getByRole('img', { name: /Pikachu sprite/i });
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imgPikachu.src).toBe(url);
    expect(imgPikachu).toBeDefined();
  });

  it('Verifica se o card do Pokémon contém um link para exibir detalhes deste Pokémon',
    () => {
      renderWithRouter(<App />);
      const details = screen.getByRole('link', { name: /more details/i });
      expect(details).toBeDefined();
    });

  it('Verifica se ao clicar no link de navegação é feito o redirecionamento correto',
    () => {
      renderWithRouter(<App />);
      const details = screen.getByRole('link', { name: /more details/i });
      userEvent.click(details);
      const headingDetails = screen.getByRole('heading',
        { name: /Pikachu Details/i, level: 2 });
      expect(headingDetails).toBeDefined();
    });

  it('Verifica se a URL exibida no navegador muda para /pokemon/<id>', () => {
    /* Utilizando o history - que é declarado no arquivo renderWithRouter -
    é possível acessar a sessão do histórico do navegador;
    O location.pathname retorna a url exata em que estamos;
    O BrowserRouter possui o history; */
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toContain('pokemons');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toContain('pokemons');

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const imgStar = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    const url = 'http://localhost/star-icon.svg';
    expect(imgStar.src).toBe(url);
    expect(imgStar).toBeDefined();
  });
});
