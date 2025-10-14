'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface CapaData {
  id: string;
  nome: string;
  imagemUrl: string;
  rating: number;
  preco: number;
  categoria: string;
  popular: boolean;
  recomendada: boolean;
  dataCreated: string;
}

export default function Home() {
  const [capas, setCapas] = useState<CapaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todas' | 'populares' | 'recomendadas'>('todas');

  useEffect(() => {
    const carregarCapas = async () => {
      try {
        setLoading(true);
        const url = filtro === 'todas' 
          ? '/api/capas' 
          : `/api/capas?tipo=${filtro}`;
        
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          setCapas(result.data);
        } else {
          console.error('Erro ao carregar capas:', result.error);
        }
      } catch (error) {
        console.error('Erro ao carregar capas:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarCapas();
  }, [filtro]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg">Carregando capas...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">JC Encadernados</h1>
        <p className="text-xl text-gray-600 mb-6">Sistema de Gerenciamento de Capas Personalizadas</p>
        
        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={() => setFiltro('todas')}
            variant={filtro === 'todas' ? 'default' : 'outline'}
          >
            Todas ({capas.length})
          </Button>
          <Button 
            onClick={() => setFiltro('populares')}
            variant={filtro === 'populares' ? 'default' : 'outline'}
          >
            Populares
          </Button>
          <Button 
            onClick={() => setFiltro('recomendadas')}
            variant={filtro === 'recomendadas' ? 'default' : 'outline'}
          >
            Recomendadas
          </Button>
        </div>
      </div>

      {capas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">Nenhuma capa encontrada para o filtro selecionado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capas.map((capa) => (
            <div key={capa.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{capa.nome}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Categoria:</span> {capa.categoria}
                </p>
                <p className="text-lg font-bold text-green-600 mb-1">
                  R$ {capa.preco.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-yellow-600">
                  <span className="font-medium">Rating:</span> {capa.rating}/5 ⭐
                </p>
              </div>
              
              <div className="flex gap-2 mb-4">
                {capa.popular && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    🔥 Popular
                  </span>
                )}
                {capa.recomendada && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ Recomendada
                  </span>
                )}
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Ver Detalhes
              </Button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}