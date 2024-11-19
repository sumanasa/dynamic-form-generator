import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import DynamicForm from './DynamicForm'; // Import your DynamicForm component
import { FormSchema } from '../types/formSchema'; // Ensure correct path relative to your test file


describe('DynamicForm Component', () => {
  // ESLint comment to disable the unused-vars rule for the next line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockSchema: FormSchema = {
    formTitle: 'Test Form',
    formDescription: 'Fill out the form below',
    fields: [
      { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Enter your name' },
      { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'Enter your email' },
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
          <DynamicForm schema={mockSchema} /> {/* Pass mockSchema correctly here */}
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
