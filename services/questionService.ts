import { Subject, Question, SchoolType, QuizType } from '../types';
import { getRandomQuestions } from '../data/questionBank';

// Static question generation - no AI/API needed
export const generateQuestions = async (
  subject: Subject,
  schoolType: SchoolType | null,
  topic?: string,
  quizType: QuizType = 'multiple-choice'
): Promise<Question[]> => {
  // Simulate slight loading delay for better UX
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get 5 random questions from the question bank
  return getRandomQuestions(subject, quizType, 5, topic);
};

// Tutoring responses library - categorized by topic/keyword
const tutorResponses: Record<string, string[]> = {
  // Maths hints
  percentage: [
    "Remember, percent means 'out of 100'. Can you convert this to a fraction first?",
    "Try dividing by 100 to convert the percentage to a decimal.",
    "Think about what percentage means - if you had 100 items, how many would this be?"
  ],
  area: [
    "For rectangles, remember: Area = length × width",
    "What shape are we working with? Each shape has its own area formula.",
    "Try drawing the shape and labeling the measurements you know."
  ],
  multiplication: [
    "Can you break this into smaller, easier multiplications?",
    "Remember your times tables! Which ones might help here?",
    "Try using the grid method to break down larger numbers."
  ],
  fraction: [
    "When adding fractions, make sure the denominators (bottom numbers) are the same first.",
    "Can you convert these to equivalent fractions with a common denominator?",
    "Think about what the fraction represents - maybe draw a picture?"
  ],
  
  // English hints
  noun: [
    "A noun is a naming word - it names a person, place, thing, or idea.",
    "Ask yourself: Is this word naming something? Then it's probably a noun!",
    "Look for words that you could put 'the' or 'a' in front of."
  ],
  verb: [
    "Verbs are action words or being words. What is the subject doing?",
    "Can you add -ing to this word? If so, it might be a verb!",
    "Think: Does this word show an action or a state of being?"
  ],
  adjective: [
    "Adjectives describe nouns. Look for descriptive words!",
    "Ask: What kind? Which one? How many? Adjectives answer these questions.",
    "Try finding the noun first, then look for words that describe it."
  ],
  punctuation: [
    "Remember to start sentences with capital letters and end with full stops.",
    "Commas separate items in a list or mark pauses in sentences.",
    "Check if you need an apostrophe for possession or contractions."
  ],
  
  // Verbal Reasoning hints
  analogy: [
    "Look at the relationship between the first pair of words, then apply the same relationship.",
    "Ask yourself: How are the first two words connected? Then find that same connection.",
    "Is it about opposites, synonyms, or a different type of relationship?"
  ],
  code: [
    "Look for a pattern - is each letter moving forward or backward in the alphabet?",
    "Try writing out the alphabet and see how each letter changes.",
    "Check if the same rule applies to each letter in the word."
  ],
  sequence: [
    "What's the pattern? Is it adding, subtracting, or following a rule?",
    "Look at the difference between numbers - is it consistent?",
    "Try working out what operation gets you from one item to the next."
  ],
  
  // Non-Verbal Reasoning hints
  rotation: [
    "Imagine turning the shape in your mind. Which way does it turn?",
    "90° is a quarter turn, 180° is a half turn, 270° is three-quarters.",
    "Visualise the shape rotating clockwise or anticlockwise."
  ],
  reflection: [
    "A reflection is like looking in a mirror - it flips the shape.",
    "What would this look like if you held it up to a mirror?",
    "Remember: reflections reverse horizontal or vertical direction."
  ],
  pattern: [
    "Look for what's repeating. How many items before it starts again?",
    "Count the elements in the pattern - does it repeat every 2, 3, or 4 items?",
    "What changes each time? Colour, shape, position, or size?"
  ],
  
  // General hints
  default: [
    "Let's break this down step by step. What information do you have?",
    "Read the question carefully. What is it actually asking?",
    "Try to eliminate obviously wrong answers first.",
    "Can you explain what you've tried so far?",
    "Sometimes it helps to work backwards from the answer choices.",
    "What strategy could you use to solve this type of problem?"
  ]
};

// Tutor chat - provides helpful hints without giving away answers
export const askTutor = async (question: string, context?: string): Promise<string> => {
  // Simulate slight delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lowerQuestion = (question + ' ' + (context || '')).toLowerCase();
  
  // Match keywords to provide relevant hints
  const keywords = Object.keys(tutorResponses);
  for (const keyword of keywords) {
    if (keyword !== 'default' && lowerQuestion.includes(keyword)) {
      const hints = tutorResponses[keyword];
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      return randomHint;
    }
  }
  
  // If no specific match, provide general hint
  const generalHints = tutorResponses.default;
  return generalHints[Math.floor(Math.random() * generalHints.length)];
};
