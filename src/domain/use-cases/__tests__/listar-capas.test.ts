import { ListarCapas } from '../ListarCapas';
import { Capa } from '../../entities/Capa';
import { Rating } from '../../value-objects/Rating';
import { PrecoValue } from '../../value-objects/PrecoValue';
import { ImagemValue } from '../../value-objects/ImagemValue';
import { CapaRepository } from '../../repositories/CapaRepository';

// Mock do repository
const mockRepository: jest.Mocked<CapaRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findPopulares: jest.fn(),
  findRecomendadas: jest.fn(),
  findByCategoria: jest.fn(),
  search: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  existsByNome: jest.fn(),
  count: jest.fn(),
  countByCategoria: jest.fn()
};

describe('ListarCapas Use Case', () => {
  let listarCapas: ListarCapas;
  let capasExemplo: Capa[];

  beforeEach(() => {
    listarCapas = new ListarCapas(mockRepository);
    jest.clearAllMocks();

    // Criar capas de exemplo
    const rating = Rating.create(4);
    const preco = PrecoValue.create(25.90);
    const imagem = ImagemValue.create('https://exemplo.com/capa.jpg');

    capasExemplo = [
      Capa.create('1', 'Romance Clássico', imagem, rating, preco, 'romance', true, false),
      Capa.create('2', 'Ficção Científica', imagem, Rating.create(5), preco, 'ficção', false, true),
      Capa.create('3', 'Biografia Inspiradora', imagem, Rating.create(3), preco, 'biografia', false, false)
    ];
  });

  describe('execute - todas as capas', () => {
    it('deve retornar todas as capas', async () => {
      mockRepository.findAll.mockResolvedValue(capasExemplo);

      const resultado = await listarCapas.execute();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toHaveLength(3);
      expect(resultado[0].nome).toBe('Romance Clássico');
    });

    it('deve retornar array vazio quando não há capas', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const resultado = await listarCapas.execute();

      expect(resultado).toEqual([]);
    });

    it('deve propagar erro do repository', async () => {
      const erroEsperado = new Error('Erro no banco de dados');
      mockRepository.findAll.mockRejectedValue(erroEsperado);

      await expect(listarCapas.execute()).rejects.toThrow('Erro ao listar capas:');
    });
  });

  describe('executePopulares - capas populares', () => {
    it('deve retornar apenas capas populares', async () => {
      const capasPopulares = capasExemplo.filter(capa => capa.popular);
      mockRepository.findPopulares.mockResolvedValue(capasPopulares);

      const resultado = await listarCapas.executePopulares();

      expect(mockRepository.findPopulares).toHaveBeenCalledTimes(1);
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nome).toBe('Romance Clássico');
      expect(resultado[0].popular).toBe(true);
    });

    it('deve propagar erro ao buscar populares', async () => {
      const erroEsperado = new Error('Erro ao buscar populares');
      mockRepository.findPopulares.mockRejectedValue(erroEsperado);

      await expect(listarCapas.executePopulares())
        .rejects.toThrow('Erro ao listar capas populares:');
    });
  });

  describe('executeRecomendadas - capas recomendadas', () => {
    it('deve retornar apenas capas recomendadas', async () => {
      const capasRecomendadas = capasExemplo.filter(capa => capa.recomendada);
      mockRepository.findRecomendadas.mockResolvedValue(capasRecomendadas);

      const resultado = await listarCapas.executeRecomendadas();

      expect(mockRepository.findRecomendadas).toHaveBeenCalledTimes(1);
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nome).toBe('Ficção Científica');
      expect(resultado[0].recomendada).toBe(true);
    });

    it('deve propagar erro ao buscar recomendadas', async () => {
      const erroEsperado = new Error('Erro ao buscar recomendadas');
      mockRepository.findRecomendadas.mockRejectedValue(erroEsperado);

      await expect(listarCapas.executeRecomendadas())
        .rejects.toThrow('Erro ao listar capas recomendadas:');
    });
  });

  describe('repository methods', () => {
    it('deve buscar por categoria', async () => {
      const capasRomance = capasExemplo.filter(capa => capa.categoria === 'romance');
      mockRepository.findByCategoria.mockResolvedValue(capasRomance);

      const resultado = await mockRepository.findByCategoria('romance');

      expect(mockRepository.findByCategoria).toHaveBeenCalledWith('romance');
      expect(resultado).toHaveLength(1);
      expect(resultado[0].categoria).toBe('romance');
    });

    it('deve buscar por termo', async () => {
      const capasFicção = capasExemplo.filter(capa => 
        capa.nome.toLowerCase().includes('ficção')
      );
      mockRepository.search.mockResolvedValue(capasFicção);

      const resultado = await mockRepository.search('ficção');

      expect(mockRepository.search).toHaveBeenCalledWith('ficção');
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nome).toBe('Ficção Científica');
    });

    it('deve verificar se capa existe', async () => {
      mockRepository.exists.mockResolvedValue(true);

      const existe = await mockRepository.exists('1');

      expect(mockRepository.exists).toHaveBeenCalledWith('1');
      expect(existe).toBe(true);
    });

    it('deve contar capas', async () => {
      mockRepository.count.mockResolvedValue(3);

      const total = await mockRepository.count();

      expect(mockRepository.count).toHaveBeenCalled();
      expect(total).toBe(3);
    });
  });
});