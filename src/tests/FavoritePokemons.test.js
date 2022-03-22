import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

it('Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);

  const paragraph = screen.getByText('No favorite pokemon found');
  expect(paragraph).toBeDefined();
});

it('se é exibido todos os cards de pokémons favoritados', () => {
  renderWithRouter(<FavoritePokemons />);

  const favorite = screen.getByRole('heading',
    { name: /Favorite Pokémons/i, level: 2 });

  expect(favorite).toBeDefined();
});
