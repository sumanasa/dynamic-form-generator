// src/components/FormField.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FieldProps {
  field: any;
}

const FormField: React.FC<FieldProps> = ({ field }) => {
  const { register, formState: { errors } } = useFormContext();

  if (field.type === 'text' || field.type === 'email' || field.type === 'textarea') {
    const Component = field.type === 'textarea' ? 'textarea' : 'input';
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
        <Component
          {...register(field.id, { required: field.required, pattern: field.validation?.pattern })}
          placeholder={field.placeholder}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
        {errors[field.id] && (
          <span className="text-red-500 text-sm">{field.validation?.message || 'This field is required'}</span>
        )}
      </div>
    );
  }

  if (field.type === 'select' || field.type === 'radio') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{field.label}</label>
        {field.type === 'select' ? (
          <select
            {...register(field.id, { required: field.required })}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            {field.options.map((option: any) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <div className="mt-1 space-y-2">
            {field.options.map((option: any) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        )}
        {errors[field.id] && (
          <span className="text-red-500 text-sm">{field.validation?.message || 'This field is required'}</span>
        )}
      </div>
    );
  }

  return null;
};

export default FormField;
