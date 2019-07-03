/**
 * @param {string} value
 * @return {value} value with trimmed white spaces
 */
const stripWhiteSpace = (value) => {
  value = value.replace(/^\s+/, '').replace(/\s$/, '');
  return value;
};

/**
 * @param {string} value
 * @return {number} word counts
 */
const wordCount = (value) => {
  const pattern = '\\w+';
  const reg = new RegExp(pattern, 'g');
  return (value.match(reg)).length;
};

/**
 * @param {number} time
 * @return {string} result article reading time
 */
const getDuration = (time) => {
  if (time < 0.5) {
    return 'less than a minute read';
  }
  if (time >= 0.5 && time < 1.5) {
    return '1 minute read';
  }
  return `${Math.ceil(time)} minute read`;
};

/**
 * @param {string} text
 * @return {number} text length
 */
const getTextLength = (text) => {
  text = stripWhiteSpace(text);
  const textLength = wordCount(text);
  return textLength;
};

/**
 * @param {string} text
 * @param {number} WORDS_PER_MINUTES
 * @return {string} result article reading time
 */
const getReadingTime = (text, WORDS_PER_MINUTES = '200') => {
  const textLength = getTextLength(text);
  const time = textLength / WORDS_PER_MINUTES;
  const result = getDuration(time);
  return result;
};

export default getReadingTime;
