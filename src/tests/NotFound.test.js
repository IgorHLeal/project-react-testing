import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

it('Verifica se página contém um h2 com o texto Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);

  const headingNotFound = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });

  expect(headingNotFound).toBeDefined();
});

it('Verifica se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gi', () => {
  renderWithRouter(<NotFound />);

  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = screen.getByRole('img',
    { name: /Pikachu crying because the page requested was not found/i });

  expect(img.src).toBe(url);
});
