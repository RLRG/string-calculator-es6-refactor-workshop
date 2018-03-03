const extractSeparators = text => {
  let separators = ["\n"];
  if (text.indexOf("][") !== -1)
    separators = ["\n"].concat(text.substr(3, text.indexOf("\n") - 4).split("]["));
  else if (text.startsWith("//["))
    separators = ["\n", text.substr(3, text.indexOf("]") - 3)];
  else if (text.startsWith("//"))
    separators = ["\n", text[2]];
  return separators;
};

const extractText = text => {
  let normalizedText = text;
  if (text.startsWith("//["))
    normalizedText = text.substr(text.indexOf("\n") + 1);
  else if (text.startsWith("//"))
    normalizedText = text.substr(4);
  return normalizedText;
};

const normalizeText = (separators, normalizedText) => {
  for (let separator of separators) {
    let escapedSeparator = "";
    for (let charInSeparator of separator.split('')) {
      if (".()[]{}$^-/?*".indexOf(charInSeparator) === -1)
        escapedSeparator += charInSeparator;
      else
        escapedSeparator += `\\${charInSeparator}`;
    }
    normalizedText = normalizedText.replace(new RegExp(escapedSeparator, "g"), ',');
  }
  return normalizedText;
};

const extractNumbers = normalizedText => normalizedText !== ''
    ? normalizedText.split(',').map(part => parseInt(part, 10))
    : [];

const checkNegatives = numbers => {
  const negativeNumbers = numbers.filter(number => number < 0);
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const discardInvalidNumbers = numbers => numbers.filter(number => number < 1000);

const sumNumbers = numbers => {
  const result = numbers.reduce((a, b) => a + b, 0);
  return result;
};

module.exports = text => {
  let separators = extractSeparators(text);

  const rawText = extractText(text);

  const normalizedText = normalizeText(separators, rawText);

  const numbers = extractNumbers(normalizedText);

  checkNegatives(numbers);

  const validNumbers = discardInvalidNumbers(numbers);

  return sumNumbers(validNumbers);
};
