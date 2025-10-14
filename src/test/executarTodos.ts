// Arquivo para executar todos os testes do projeto
// Executa: npm run test:console

import { Capa } from '../domain/entities/Capa';
import { Rating } from '../domain/value-objects/Rating';
import { PrecoValue } from '../domain/value-objects/PrecoValue';
import { ImagemValue } from '../domain/value-objects/ImagemValue';

// Função de teste simples para entidade Capa
function testCriarCapaValida() {
  console.log('🧪 Testando criação de capa válida...');
  
  try {
    const capa = Capa.create(
      'test-id',
      'Capa Teste',
      ImagemValue.create('./image/teste.png'),
      Rating.create(4),
      PrecoValue.create(25.90),
      'Teste'
    );

    console.assert(capa.id === 'test-id', 'ID deve ser test-id');
    console.assert(capa.nome === 'Capa Teste', 'Nome deve ser Capa Teste');
    console.assert(capa.categoria === 'Teste', 'Categoria deve ser Teste');
    console.assert(capa.popular === false, 'Inicialmente não deve ser popular');
    console.assert(capa.recomendada === false, 'Inicialmente não deve ser recomendada');
    
    console.log('✅ Teste de criação de capa passou!');
  } catch (error) {
    console.error('❌ Teste de criação de capa falhou:', error);
  }
}

function testCapaInvalida() {
  console.log('🧪 Testando capa com dados inválidos...');
  
  try {
    // Teste ID vazio
    try {
      Capa.create('', 'Nome', ImagemValue.create('./test.png'), Rating.create(4), PrecoValue.create(25.90), 'Categoria');
      console.error('❌ Deveria ter falhado com ID vazio');
    } catch (error) {
      console.assert(error instanceof Error && error.message.includes('ID da capa é obrigatório'), 'Erro de ID correto');
    }

    // Teste nome vazio
    try {
      Capa.create('id', '', ImagemValue.create('./test.png'), Rating.create(4), PrecoValue.create(25.90), 'Categoria');
      console.error('❌ Deveria ter falhado com nome vazio');
    } catch (error) {
      console.assert(error instanceof Error && error.message.includes('Nome da capa é obrigatório'), 'Erro de nome correto');
    }

    console.log('✅ Teste de validação passou!');
  } catch (error) {
    console.error('❌ Teste de validação falhou:', error);
  }
}

function testRatingValidation() {
  console.log('🧪 Testando validação de rating...');
  
  try {
    // Teste rating válido
    const rating = Rating.create(4);
    console.assert(rating.value === 4, 'Rating deve ser 4');
    
    // Teste rating inválido
    try {
      Rating.create(0);
      console.error('❌ Deveria ter falhado com rating 0');
    } catch (error) {
      console.assert(error instanceof Error && error.message.includes('Rating deve estar entre 1 e 5'), 'Erro de rating correto');
    }
    
    console.log('✅ Teste de rating passou!');
  } catch (error) {
    console.error('❌ Teste de rating falhou:', error);
  }
}

function testPrecoValidation() {
  console.log('🧪 Testando validação de preço...');
  
  try {
    // Teste preço válido
    const preco = PrecoValue.create(25.90);
    console.assert(preco.value === 25.90, 'Preço deve ser 25.90');
    console.assert(preco.toString() === 'R$ 25,90', 'Formatação deve estar correta');
    
    // Teste preço inválido
    try {
      PrecoValue.create(-10);
      console.error('❌ Deveria ter falhado com preço negativo');
    } catch (error) {
      console.assert(error instanceof Error && error.message.includes('Preço não pode ser negativo'), 'Erro de preço correto');
    }
    
    console.log('✅ Teste de preço passou!');
  } catch (error) {
    console.error('❌ Teste de preço falhou:', error);
  }
}

// Executar todos os testes
export function executarTodosOsTestes() {
  console.log('🚀 === EXECUTANDO TODOS OS TESTES === 🚀\n');
  
  // Testes das entidades
  testCriarCapaValida();
  testCapaInvalida();
  
  // Testes dos value objects
  testRatingValidation();
  testPrecoValidation();
  
  console.log('\n🎉 === TODOS OS TESTES CONCLUÍDOS === 🎉');
}

// Executar automaticamente se for o arquivo principal
if (typeof window === 'undefined') {
  executarTodosOsTestes();
}