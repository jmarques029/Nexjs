import { NextRequest, NextResponse } from 'next/server';
import { ListarCapas } from '@/domain/use-cases/ListarCapas';
import { MockCapaRepository } from '@/inframocks/MockCapaRepository';

const capaRepository = new MockCapaRepository();
const listarCapas = new ListarCapas(capaRepository);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const tipo = searchParams.get('tipo'); // 'populares', 'recomendadas'

    let capas;

    if (tipo === 'populares') {
      capas = await listarCapas.executePopulares();
    } else if (tipo === 'recomendadas') {
      capas = await listarCapas.executeRecomendadas();
    } else if (categoria) {
      capas = await listarCapas.executeByCategoria(categoria);
    } else {
      capas = await listarCapas.execute();
    }

    const capasSerializadas = capas.map(capa => capa.toPrimitives());

    return NextResponse.json({ 
      success: true, 
      data: capasSerializadas 
    });
  } catch (error) {
    console.error('Erro na API de capas:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}