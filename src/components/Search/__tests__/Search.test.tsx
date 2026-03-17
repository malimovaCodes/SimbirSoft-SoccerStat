import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../Search';
import { describe, it, expect, vi } from 'vitest';

describe('Search', () => {
  it('отображает placeholder', () => {
    render(<Search value="" onChange={vi.fn()} placeholder="Поиск..." />);
    expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument();
  });

  it('вызывает onChange при вводе', () => {
    const handleChange = vi.fn();
    render(<Search value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Arsenal' },
    });
    
    expect(handleChange).toHaveBeenCalledWith('Arsenal');
  });

  it('очищает значение при нажатии на крестик', () => {
    const handleChange = vi.fn();
    render(<Search value="test" onChange={handleChange} />);
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith('');
  });
});