// src/components/someOtherFile.ts

import { validateJSON } from './utils/validateJSON';

const someJson: string = '{"name": "John", "age": 30}';  // Explicitly defining the type

const result = validateJSON(someJson);

if (result) {
  console.log('Valid JSON:', result);
} else {
  console.error('Invalid JSON');
}
