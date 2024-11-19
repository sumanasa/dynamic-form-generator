// src/components/utils/validateJSON.ts

export const validateJSON = (json: string): object | null => {
    try {
      const parsed = JSON.parse(json);
      return parsed;
    } catch (e) {
      return null;
    }
  };
  