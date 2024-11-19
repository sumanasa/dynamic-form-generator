import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import JSONEditor from './JSONEditor';

describe('JSONEditor Component', () => {
  it('renders without crashing', () => {
    render(<JSONEditor onJSONChange={jest.fn()} />);
    expect(screen.getByPlaceholderText('Edit JSON here...')).toBeInTheDocument();
  });

  it('displays an error for invalid JSON', () => {
    render(<JSONEditor onJSONChange={jest.fn()} />);
    const textarea = screen.getByPlaceholderText('Edit JSON here...');
    fireEvent.change(textarea, { target: { value: '{invalid: JSON}' } });
    expect(screen.getByText('Invalid JSON format')).toBeInTheDocument();
  });

  it('calls onJSONChange for valid JSON', () => {
    const mockOnJSONChange = jest.fn();
    render(<JSONEditor onJSONChange={mockOnJSONChange} />);
    const textarea = screen.getByPlaceholderText('Edit JSON here...');
    fireEvent.change(textarea, { target: { value: '{"key": "value"}' } });
    expect(mockOnJSONChange).toHaveBeenCalledWith({ key: 'value' });
  });
});
