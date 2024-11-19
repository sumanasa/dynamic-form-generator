// src/components/DynamicForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Define the types for form fields and schema
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

// DynamicForm component
const DynamicForm: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{schema.formTitle}</h1>
      <p>{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block font-medium">{field.label}</label>
            <Controller
              name={field.id}
              control={control}
              rules={{
                required: field.required,
              }}
              render={({ field: controllerField }) => {
                switch (field.type) {
                  case 'text':
                  case 'email':
                    return (
                      <input 
                        {...controllerField} 
                        type={field.type} 
                        placeholder={field.placeholder} 
                        className="w-full p-2 border border-gray-300 rounded" 
                      />
                    );
                  case 'select':
                    return (
                      <select {...controllerField} className="w-full p-2 border border-gray-300 rounded">
                        {field.options?.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    );
                  case 'textarea':
                    return (
                      <textarea 
                        {...controllerField} 
                        placeholder={field.placeholder} 
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    );
                  default:
                    return <div />; // Return an empty div for unsupported types
                }
              }}
            />
            {errors[field.id] && <p className="text-red-500 text-sm">{(errors[field.id] as any)?.message}</p>}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
