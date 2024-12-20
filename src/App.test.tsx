// src/App.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import DynamicForm from './components/DynamicForm';

// Define the types for form schema and fields
interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'textarea'; // Restrict to valid types
  label: string;
  required: boolean;
  placeholder: string;
  options?: { value: string; label: string }[]; // Only for 'select' fields
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

describe('DynamicForm Component', () => {
  // Corrected mockSchema with correct types
  const mockSchema: FormSchema = {
    formTitle: 'Test Form',
    formDescription: 'Fill out the form below',
    fields: [
      { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Enter your name' },
    ],
  };

  it('handles form submission', async () => {
    // Mock the alert function to prevent errors in jsdom environment
    global.alert = jest.fn();

    // Create a Wrapper component to use FormProvider and pass props
    const Wrapper = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <DynamicForm schema={mockSchema} />
        </FormProvider>
      );
    };

    // Render the wrapper component
    render(<Wrapper />);

    // Fill out the form by changing the input value
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });

    // Wait for the form submission to be processed
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Use waitFor to wait for the form submission to complete
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));

    // Now, check if the alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith('Form submitted successfully!');
  });
});
