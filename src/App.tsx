import React from 'react';
import { formSchema } from './components/FormSchema'; // Correct path to FormSchema
import DynamicForm from './components/DynamicForm'; // Correct path to DynamicForm
import './index.css'; // Tailwind CSS import

const App: React.FC = () => {
  return (
    <div className="App">
      <DynamicForm schema={formSchema} />
    </div>
  );
};

export default App;
