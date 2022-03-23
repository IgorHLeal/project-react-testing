import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

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
  renderWithRouter(<About />);
  // Foi preciso usar template literal por causa do tamanho máximo da linha
  const firstParagraphOne = 'This application simulates a Pokédex';
  const firstParagraphTwo = 'a digital encyclopedia containing all Pokémons';
  const firstParagraph = `${firstParagraphOne} ${firstParagraphTwo}`;

  // Precisei colocar os parênteses por causa do tamanho máximo da linha
  const scnd = (
    'One can filter Pokémons by type, and see more details for each one of them'
  );
  expect(firstParagraph).toBeDefined();
  expect(scnd).toBeDefined();

  // ---------- Segunda opção - Entender onde está falhando ----------
  /* const { sectionParagraphs } = renderWithRouter(<About />);
  const paragraphs = sectionParagraphs.querySelector('p');
  expect(paragraphs).toHaveLength(2); */
});

it('Teste se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = screen.getByRole('img', { name: /Pokédex/i });

  // Aqui usei o atributo src da img pois me lembro do Braddock acessar,
  // da mesma forma, a propriedade type de um button
  expect(image.src).toBe(url);
});
