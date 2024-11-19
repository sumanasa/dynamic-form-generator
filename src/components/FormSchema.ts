// src/components/FormSchema.ts
import { FormSchema } from '../types/formSchema'; // Correct path to the type definition if necessary

export const formSchema: FormSchema = {
  formTitle: 'Test Form',
  formDescription: 'Fill out the form below',
  fields: [
    { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Enter your name' },
    { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'Enter your email' },
  ],
};
