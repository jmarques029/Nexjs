import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('deve renderizar o botão com texto', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toBeDefined();
    expect(button.textContent).toBe('Clique aqui');
  });

  it('deve aplicar classes CSS customizadas', () => {
    render(<Button className="custom-class">Botão</Button>);
    
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('deve ser desabilitado quando disabled=true', () => {
    render(<Button disabled>Botão Desabilitado</Button>);
    
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('deve ter o tipo correto', () => {
    render(<Button type="submit">Enviar</Button>);
    
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.type).toBe('submit');
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});