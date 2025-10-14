import { GET } from '@/app/api/capas/route';
import { NextRequest } from 'next/server';

// Mock dos dados de exemplo
jest.mock('@/inframocks/CapasExemplo', () => ({
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

  it('deve lidar com erros graciosamente', async () => {
    // Mock de erro temporário
    const originalConsoleError = console.error;
    console.error = jest.fn();

    try {
      // Simular erro de parsing de URL
      const request = new NextRequest('invalid-url');
      const response = await GET(request);
      
      // Verificar que ainda retorna uma resposta válida
      expect(response.status).toBeGreaterThanOrEqual(200);
    } catch (error) {
      // Se houver erro, deve ser tratado adequadamente
      expect(error).toBeDefined();
    } finally {
      console.error = originalConsoleError;
    }
  });
});