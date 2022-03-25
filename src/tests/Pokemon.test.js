import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  it('Verifica se é renderizado um card com informações de determinado pokémon', () => {
    renderWithRouter(<App />);
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

  it('', () => {

  });

  it('', () => {

  });
});
