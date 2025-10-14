import { GET } from '../api/capas/route';
import { NextRequest } from 'next/server';

// Mock dos dados de exemplo
jest.mock('../../../inframocks/CapasExemplo', () => ({
  capasExemplo: [
    {
      id: '1',
      nome: 'Romance Clássico',
      imagemUrl: 'https://exemplo.com/romance.jpg',
      rating: 4,
      preco: 25.90,
      categoria: 'romance',
      popular: true,
      recomendada: false,
      dataCreated: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2', 
      nome: 'Ficção Científica',
      imagemUrl: 'https://exemplo.com/ficcao.jpg',
      rating: 5,
      preco: 35.50,
      categoria: 'ficção',
      popular: false,
      recomendada: true,
      dataCreated: '2024-01-02T00:00:00.000Z'
    }
  ]
}));

describe('/api/capas', () => {
  it('deve retornar todas as capas quando não há parâmetros', async () => {
    const request = new NextRequest('http://localhost:3000/api/capas');
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].nome).toBe('Romance Clássico');
  });

  it('deve retornar capas populares quando tipo=populares', async () => {
    const request = new NextRequest('http://localhost:3000/api/capas?tipo=populares');
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].popular).toBe(true);
    expect(data[0].nome).toBe('Romance Clássico');
  });

  it('deve retornar capas recomendadas quando tipo=recomendadas', async () => {
    const request = new NextRequest('http://localhost:3000/api/capas?tipo=recomendadas');
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].recomendada).toBe(true);
    expect(data[0].nome).toBe('Ficção Científica');
  });

  it('deve retornar erro 500 em caso de falha', async () => {
    // Forçar erro temporariamente
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Mock que gera erro
    jest.doMock('../../../inframocks/CapasExemplo', () => {
      throw new Error('Erro de teste');
    });

    try {
      const request = new NextRequest('http://localhost:3000/api/capas');
      const response = await GET(request);
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Erro interno do servidor');
    } finally {
      console.error = originalConsoleError;
      jest.clearAllMocks();
    }
  });

  it('deve filtrar por categoria', async () => {
    const request = new NextRequest('http://localhost:3000/api/capas?categoria=romance');
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].categoria).toBe('romance');
  });

  it('deve retornar array vazio para categoria inexistente', async () => {
    const request = new NextRequest('http://localhost:3000/api/capas?categoria=inexistente');
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveLength(0);
  });
});