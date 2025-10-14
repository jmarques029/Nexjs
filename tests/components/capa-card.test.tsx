import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Componente simples para teste
const CapaCard = ({ capa }: { capa: any }) => (
  <article className="bg-white rounded-lg shadow-md p-4">
    <img src={capa.imagemUrl} alt={capa.nome} className="w-full h-48 object-cover rounded" />
    <h3 className="text-lg font-semibold mt-2">{capa.nome}</h3>
    <p className="text-gray-600">{capa.categoria}</p>
    <p className="text-blue-600 font-bold">R$ {capa.preco.toFixed(2).replace('.', ',')}</p>
    <div className="flex items-center mt-2">
      <span>{capa.rating}/5</span>
    </div>
    {capa.popular && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Popular</span>}
    {capa.recomendada && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Recomendada</span>}
  </article>
);

describe('CapaCard Component', () => {
  const capaExemplo = {
    id: '1',
    nome: 'Romance Clássico',
    imagemUrl: 'https://exemplo.com/romance.jpg',
    rating: 4,
    preco: 25.90,
    categoria: 'romance',
    popular: true,
    recomendada: false,
    dataCreated: '2024-01-01T00:00:00.000Z'
  };

  it('deve renderizar informações da capa', () => {
    render(<CapaCard capa={capaExemplo} />);
    
    expect(screen.getByText('Romance Clássico')).toBeDefined();
    expect(screen.getByText('romance')).toBeDefined();
    expect(screen.getByText('R$ 25,90')).toBeDefined();
  });

  it('deve exibir imagem da capa', () => {
    render(<CapaCard capa={capaExemplo} />);
    
    const imagem = screen.getByRole('img') as HTMLImageElement;
    expect(imagem.src).toBe('https://exemplo.com/romance.jpg');
    expect(imagem.alt).toBe('Romance Clássico');
  });

  it('deve mostrar rating em estrelas', () => {
    render(<CapaCard capa={capaExemplo} />);
    
    expect(screen.getByText('4/5')).toBeDefined();
  });

  it('deve exibir badge "Popular" para capas populares', () => {
    render(<CapaCard capa={capaExemplo} />);
    
    expect(screen.getByText('Popular')).toBeDefined();
  });

  it('deve exibir badge "Recomendada" para capas recomendadas', () => {
    const capaRecomendada = {
      ...capaExemplo,
      popular: false,
      recomendada: true
    };
    
    render(<CapaCard capa={capaRecomendada} />);
    
    expect(screen.getByText('Recomendada')).toBeDefined();
  });

  it('não deve exibir badge Popular se não for popular', () => {
    const capaNormal = {
      ...capaExemplo,
      popular: false,
      recomendada: false
    };
    
    render(<CapaCard capa={capaNormal} />);
    
    expect(screen.queryByText('Popular')).toBeNull();
  });

  it('deve exibir preço formatado corretamente', () => {
    const capaComPrecoAlto = {
      ...capaExemplo,
      preco: 129.99
    };
    
    render(<CapaCard capa={capaComPrecoAlto} />);
    
    expect(screen.getByText('R$ 129,99')).toBeDefined();
  });

  it('deve aplicar classes CSS corretas', () => {
    render(<CapaCard capa={capaExemplo} />);
    
    const card = screen.getByRole('article');
    expect(card.className).toContain('bg-white');
  });
});