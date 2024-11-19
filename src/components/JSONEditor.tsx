// src/components/JSONEditor.tsx
import React, { useState } from 'react';

interface JSONEditorProps {
  onJSONChange: (json: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onJSONChange }) => {
  const [jsonString, setJsonString] = useState<string>('{}');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setJsonString(input);
    try {
      const parsedJSON = JSON.parse(input);
      setError(null);
      onJSONChange(parsedJSON);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        className="flex-grow p-2 border border-gray-300 rounded"
        value={jsonString}
        onChange={handleChange}
        placeholder="Edit JSON here..."
      />
      {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
    </div>
  );
};

export default JSONEditor;
