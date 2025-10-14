// Export all domain types and classes
export { Capa } from './domain/entities/Capa';
export { Rating } from './domain/value-objects/Rating';
export { PrecoValue } from './domain/value-objects/PrecoValue';
export { ImagemValue } from './domain/value-objects/ImagemValue';
export { ListarCapas } from './domain/use-cases/ListarCapas';
export { MockCapaRepository } from './inframocks/MockCapaRepository';
export { CAPAS_EXEMPLO, CATEGORIAS_EXEMPLO } from './inframocks/CapasExemplo';

// Type definitions for API responses
export interface CapaApiResponse {
  success: boolean;
  data?: CapaData[];
  error?: string;
}

export interface CapaData {
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