const checkIfExists = async (model, query) => {
  return (await model.countDocuments(query)) > 0;
};

const parseId = (id) => {
  if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
    throw `Invalid ID '${id}'`;
  }

  return parseInt(id, 10);
};

/// Make sure description has a capitalized first letter on every sentence and ends with a dot
const convertToCapitalizedLetter = (str) => {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }
  
  if (!str.trim()) return str; 

  let processed = str.trim();
  
  // Replace multiple dots with single dot
  processed = processed.replace(/\.+/g, '.');
  
  // Remove all spaces around dots first
  processed = processed.replace(/\s*\.\s*/g, '.');
  
  // Add space after dots (except when at end)
  processed = processed.replace(/\.(?!$)/g, '. ');
  
  // Capitalize first letter of each sentence
  const sentences = processed.split('. ');
  const capitalized = sentences.map((sentence, index) => {
    if (!sentence) return '';
    
    // Skip capitalization if it's just a leftover dot
    if (index === sentences.length - 1 && sentence === '') return '';
    
    return sentence.charAt(0).toUpperCase() + 
           sentence.slice(1).toLowerCase();
  }).filter(Boolean); // Remove empty strings

  // Join with proper spacing and ensure single final dot
  let result = capitalized.join('. ');
  
  // Add final dot only if we have content and it's missing
  if (result && !result.endsWith('.')) {
    result += '.';
  }
  
  // Remove any accidental double dots
  result = result.replace(/\.\./g, '.');

  return result;
};
  
const convertToCapitalizedLetters = (str) => {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }
  // if a string has space, slit it into an array and capitalize each word, then join the array into a string
  if (str.includes(" ")) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const sanitizeName = (input, fieldName) => {
  const trimmedInput = input.trim();
  const lettersAndSpacesOnly = /^[a-zA-Z\s]+$/;
  
  if (!lettersAndSpacesOnly.test(trimmedInput)) {
    return { 
      message: `${fieldName} can only contain letters and spaces`
    };
  }

  return { sanitized: trimmedInput };
};


const sanitizeDescription = (input, fieldName) => {
  const trimmedInput = input.trim();
  const lettersNumbersAndSpecialChars = /^[a-zA-Z0-9'-,. ]+$/;
  
  if (!lettersNumbersAndSpecialChars.test(trimmedInput)) {
    return { 
      message: `${fieldName} can only contain letters, numbers, and the following special characters: - , . '` 
    };
  }

  return { sanitized: trimmedInput };
};

export { checkIfExists, parseId, convertToCapitalizedLetter, convertToCapitalizedLetters, sanitizeName, sanitizeDescription };
