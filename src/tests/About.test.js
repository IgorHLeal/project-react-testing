import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const headingAbout = screen.getByRole('heading',
    { name: 'About Pokédex', level: 2 });
  expect(headingAbout).toBeDefined();
});

it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const firstParagraph = screen.getByRole('This application simulates a Pokédex');
  const secondParagraph = screen.getByText('One can filter Pokémons by typ');

  expect(firstParagraph).toBeDefined();
  expect(secondParagraph).toBeDefined();
});
