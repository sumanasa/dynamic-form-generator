// src/types/formSchema.ts

export interface FormField {
    id: string;
    type: 'text' | 'email' | 'select' | 'textarea'; // Restrict to valid types
    label: string;
    required: boolean;
    placeholder: string;
    options?: { value: string; label: string }[]; // Only for 'select' fields
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
  }
  