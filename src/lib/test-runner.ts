import { ListarCapas } from '../domain/use-cases/ListarCapas';
import { MockCapaRepository } from '../inframocks/MockCapaRepository';

// Test runner simples para verificar se o domínio está funcionando
export async function testarDominio() {
  console.log('🚀 Iniciando testes do domínio...\n');

  try {
    // Setup
    const capaRepository = new MockCapaRepository();
    const listarCapas = new ListarCapas(capaRepository);

    // Teste 1: Listar todas as capas
    console.log('📋 Teste 1: Listando todas as capas');
    const todasCapas = await listarCapas.execute();
    console.log(`✅ Total de capas: ${todasCapas.length}`);
    
    if (todasCapas.length > 0) {
      const primeira = todasCapas[0];
      console.log(`   Primeira capa: ${primeira.nome} - ${primeira.categoria}`);
    }

    // Teste 2: Listar capas populares
    console.log('\n🔥 Teste 2: Listando capas populares');
    const capasPopulares = await listarCapas.executePopulares();
    console.log(`✅ Capas populares: ${capasPopulares.length}`);
    
    capasPopulares.forEach(capa => {
      console.log(`   - ${capa.nome} (${capa.categoria})`);
    });

    // Teste 3: Listar capas recomendadas
    console.log('\n⭐ Teste 3: Listando capas recomendadas');
    const capasRecomendadas = await listarCapas.executeRecomendadas();
    console.log(`✅ Capas recomendadas: ${capasRecomendadas.length}`);
    
    capasRecomendadas.forEach(capa => {
      console.log(`   - ${capa.nome} (${capa.categoria})`);
    });

    // Teste 4: Filtrar por categoria
    console.log('\n📂 Teste 4: Filtrando por categoria "Religioso"');
    const capasReligiosas = await listarCapas.executeByCategoria('Religioso');
    console.log(`✅ Capas religiosas: ${capasReligiosas.length}`);
    
    capasReligiosas.forEach(capa => {
      console.log(`   - ${capa.nome} - ${capa.preco.toString()}`);
    });

    // Teste 5: Serialização
    console.log('\n🔄 Teste 5: Testando serialização');
    if (todasCapas.length > 0) {
      const capaSerializada = todasCapas[0].toPrimitives();
      console.log('✅ Serialização funcionou:');
      console.log(`   ID: ${capaSerializada.id}`);
      console.log(`   Nome: ${capaSerializada.nome}`);
      console.log(`   Preço: R$ ${capaSerializada.preco.toFixed(2)}`);
      console.log(`   Rating: ${capaSerializada.rating}/5`);
    }

    console.log('\n🎉 Todos os testes passaram com sucesso!');
    return true;

  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    return false;
  }
}

// Auto-execução se for o arquivo principal
if (typeof window === 'undefined') {
  testarDominio().then(sucesso => {
    if (sucesso) {
      console.log('\n✅ Sistema pronto para desenvolvimento!');
    } else {
      console.log('\n❌ Há problemas que precisam ser corrigidos.');
    }
  });
}