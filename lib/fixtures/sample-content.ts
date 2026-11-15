import type { GeneratedContent } from "../../schemas/content.ts";

export const SAMPLE_FRACTIONS_CONTENT: GeneratedContent = {
  topic: "Fractions",
  grade: 4,
  subject: "Mathematics",
  parent_summary:
    "A fraction represents equal parts of a whole thing or group. The top number (numerator) tells how many parts you have; the bottom number (denominator) tells how many equal parts make the whole.",
  intuition:
    "Think of sharing a circular pizza or folding a strip of paper. If a pizza is cut into 4 equal slices and you eat 1 slice, you ate 1 out of 4 slices, written as 1/4. The denominator (bottom) names the size of each slice—the bigger the denominator, the smaller each slice actually is!",
  notes: {
    overview:
      "A fraction is written as a/b where 'a' is the numerator and 'b' is the denominator (b ≠ 0). It fundamentally describes a part-to-whole relationship or division of a whole unit into equal shares.",
    key_definitions: [
      {
        term: "Numerator (Top Number)",
        meaning: "The number of parts being considered, eaten, shaded, or counted.",
      },
      {
        term: "Denominator (Bottom Number)",
        meaning: "The total number of equal parts that make up one complete whole.",
      },
      {
        term: "Equivalent Fractions",
        meaning: "Fractions that look different but have the exact same numeric value (e.g., 1/2 = 2/4 = 4/8).",
      },
      {
        term: "Unit Fraction",
        meaning: "A fraction where the numerator is 1 (e.g., 1/2, 1/3, 1/4).",
      },
    ],
    core_rules: [
      "All parts MUST be equal in size before you can count them as a fraction.",
      "The bigger the denominator, the smaller each individual piece is (1/8 < 1/4).",
      "When adding fractions with like denominators, only add the top numbers: a/c + b/c = (a+b)/c. Never add denominators!",
      "Multiplying or dividing both the top and bottom by the same non-zero number produces an equivalent fraction.",
    ],
    real_world_examples: [
      "Pizza Slices: A pizza cut into 8 slices. If your child eats 2 slices, they ate 2/8 (which simplifies to 1/4).",
      "Clock Face: 15 minutes is a quarter of an hour (15/60 = 1/4). 30 minutes is half an hour (30/60 = 1/2).",
      "Measuring Cups in Baking: 1/2 cup of sugar, 1/4 cup of cocoa powder.",
    ],
    parent_cheat_sheet: [
      "Memory Trick: 'D is for Denominator and Down' to help your child remember the bottom number.",
      "Remind your child: The fraction bar line literally means division (1/2 means 1 divided by 2).",
      "Always encourage simplifying the final answer (e.g. 2/4 should be simplified to 1/2).",
    ],
  },
  steps: [
    "Identify the whole object or total group.",
    "Count how many equal parts the whole is divided into—that becomes the bottom number (denominator).",
    "Count how many of those equal parts are shaded, taken, or being asked about—that becomes the top number (numerator).",
    "Read the fraction out loud: for example, 3/4 is 'three-fourths'.",
  ],
  common_mistakes: [
    "Thinking larger denominators mean larger pieces (e.g. thinking 1/8 is bigger than 1/4 because 8 is bigger than 4).",
    "Adding denominators when adding fractions with like denominators (e.g. 1/4 + 2/4 = 3/8 instead of 3/4).",
    "Not ensuring parts are divided equally before counting fractional parts.",
  ],
  kid_script:
    "Imagine we order a delicious pizza and cut it into 4 equal slices. If I give you 1 slice, you have one slice out of four—we call that one-fourth! The bottom number tells us how many slices the pizza was cut into, and the top number is how many you have on your plate.",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question:
        "A chocolate bar has 6 equal pieces. Sam eats 2 pieces. What fraction of the chocolate bar did Sam eat?",
      hint: "Remember: The total number of pieces goes on the bottom, and the pieces eaten go on top.",
      answer: "2/6 (or 1/3)",
      solution_steps: [
        "Find the total number of equal pieces: 6 (this is the denominator).",
        "Find the number of pieces eaten: 2 (this is the numerator).",
        "Put the parts together: 2/6. Simplified, 2/6 = 1/3.",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question:
        "Which slice is bigger: 1/3 of a cake or 1/5 of the same cake?",
      hint: "Imagine sharing a cake with 3 friends versus sharing the same cake with 5 friends.",
      answer: "1/3 of the cake",
      solution_steps: [
        "If you cut a cake into 3 parts, each part is relatively large.",
        "If you cut the exact same cake into 5 parts, each part has to be smaller to fit.",
        "Therefore, 1/3 is greater than 1/5.",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question: "Solve: 2/7 + 3/7 = ?",
      hint: "When denominators are the same, just add the top numbers and keep the bottom number the same.",
      answer: "5/7",
      solution_steps: [
        "Check if the denominators match: both are 7.",
        "Add the numerators together: 2 + 3 = 5.",
        "Keep the denominator unchanged: 5/7.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question:
        "There are 12 pencils in a box. 3 are blue, 4 are red, and the rest are yellow. What fraction of the pencils are yellow?",
      hint: "First find out how many pencils are yellow, then write that count over 12.",
      answer: "5/12",
      solution_steps: [
        "Add the blue and red pencils: 3 + 4 = 7 pencils.",
        "Subtract from the total to find the yellow pencils: 12 - 7 = 5 pencils.",
        "Write the fraction over the total count: 5/12.",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question:
        "Maya ate 1/2 of her mini pizza. Leo ate 2/4 of his identical mini pizza. Who ate more pizza?",
      hint: "Can 2/4 be simplified by dividing top and bottom by 2?",
      answer: "They ate the exact same amount.",
      solution_steps: [
        "Maya ate 1/2.",
        "Leo ate 2/4. If we divide the numerator (2) and denominator (4) both by 2, we get 1/2.",
        "1/2 is equivalent to 2/4, so both children ate equal amounts.",
      ],
    },
  ],
};

export const SAMPLE_PHOTOSYNTHESIS_CONTENT: GeneratedContent = {
  topic: "Photosynthesis",
  grade: 5,
  subject: "Science",
  parent_summary:
    "Photosynthesis is the process green plants use to turn sunlight, water, and carbon dioxide into food (glucose sugar) and oxygen.",
  intuition:
    "Plants can't go to the grocery store or cook in a kitchen like humans. Instead, their green leaves act like tiny solar-powered kitchens that catch sunlight and bake sugar for plant energy, while giving off fresh oxygen into the air for us to breathe.",
  notes: {
    overview:
      "Photosynthesis is biochemical synthesis powered by light energy. Plants convert radiant solar energy into chemical energy stored in glucose bonds, providing the foundation for nearly all life on Earth.",
    key_definitions: [
      {
        term: "Chlorophyll",
        meaning: "The green pigment in leaf cells that absorbs sunlight (primarily blue and red light).",
      },
      {
        term: "Chloroplast",
        meaning: "The specialized plant cell organelle where photosynthesis actually takes place.",
      },
      {
        term: "Stomata",
        meaning: "Microscopic microscopic pores on leaf surfaces that take in carbon dioxide and release oxygen.",
      },
      {
        term: "Glucose",
        meaning: "Simple sugar (C6H12O6) produced by the plant for energy, growth, and cellular repair.",
      },
    ],
    core_rules: [
      "Chemical Equation: Carbon Dioxide + Water + Sunlight ➔ Glucose + Oxygen.",
      "Plants need light: Photosynthesis happens only during daytime or in the presence of adequate light.",
      "Roots absorb water from soil; leaves absorb CO2 from the air.",
    ],
    real_world_examples: [
      "Solar Cooker / Solar Panel: Leaves catch photons like mini rooftop solar panels to cook plant food.",
      "Air Purifiers: Plants act as natural living filters that inhale dirty CO2 and exhale clean breathable oxygen.",
    ],
    parent_cheat_sheet: [
      "Word origin: 'Photo' means Light, 'Synthesis' means Putting Together. Literally: 'Putting together with light'.",
      "Common misconception to fix: Soil provides water and minerals, NOT plant food. The plant makes its own food in leaves!",
    ],
  },
  steps: [
    "Roots absorb water and nutrients from the soil.",
    "Leaves take in carbon dioxide gas from the air through tiny openings called stomata.",
    "Chlorophyll (the green chemical inside leaf cells) traps energy from sunlight.",
    "The plant mixes water and carbon dioxide with solar energy to create glucose (sugar food) and releases oxygen.",
  ],
  common_mistakes: [
    "Thinking plants get their food from the soil—soil provides water and minerals, but plants make their actual food (glucose) via sunlight.",
    "Forgetting that plants produce oxygen during the day and need carbon dioxide, opposite to human breathing.",
    "Thinking photosynthesis happens throughout the entire plant, rather than mainly in green leaves containing chlorophyll.",
  ],
  kid_script:
    "Did you know leaves are tiny solar kitchens? When a tree is thirsty, its roots drink water. When it's hungry, its green leaves catch sunlight and scoop carbon dioxide from the air. It bakes a yummy plant-sugar called glucose and exhales fresh oxygen for us!",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question:
        "What three ingredients does a plant need to perform photosynthesis?",
      hint: "Think about what shines from above, what rains from clouds, and the air plants breathe in.",
      answer: "Sunlight, water, and carbon dioxide",
      solution_steps: [
        "Sunlight provides energy.",
        "Water is absorbed by roots.",
        "Carbon dioxide is taken from air through leaves.",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question:
        "What gives plant leaves their green color and captures sunlight?",
      hint: "It starts with the letter 'C' and is found in chloroplasts.",
      answer: "Chlorophyll",
      solution_steps: [
        "Chlorophyll is the green pigment in leaves.",
        "It absorbs solar energy needed to power photosynthesis.",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question:
        "What gas do plants release into the atmosphere during photosynthesis that animals need to breathe?",
      hint: "It's the gas we take in every time we inhale.",
      answer: "Oxygen (O2)",
      solution_steps: [
        "Plants take in carbon dioxide.",
        "They break down water and carbon dioxide molecules.",
        "They release oxygen gas as a byproduct into the atmosphere.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question:
        "If a houseplant is placed in a dark closet for two weeks with water, why will it stop growing and turn pale?",
      hint: "What crucial ingredient from the sun is missing in the closet?",
      answer:
        "Without sunlight, the plant cannot perform photosynthesis to make glucose food.",
      solution_steps: [
        "Water alone cannot provide the plant with food energy.",
        "Sunlight is required to trigger photosynthesis in chlorophyll.",
        "Without light, the plant starves and chlorophyll degrades.",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question:
        "Explain the mutual relationship between humans and plants regarding the gases we breathe.",
      hint: "What gas do humans exhale and plants inhale, and vice-versa?",
      answer:
        "Humans inhale oxygen and exhale carbon dioxide; plants take in carbon dioxide and release oxygen.",
      solution_steps: [
        "Humans and animals breathe in oxygen and exhale carbon dioxide.",
        "Plants take in carbon dioxide during photosynthesis and release oxygen.",
        "This forms a continuous natural cycle supporting life on Earth.",
      ],
    },
  ],
};

export const SAMPLE_NOUNS_CONTENT: GeneratedContent = {
  topic: "Nouns",
  grade: 3,
  subject: "English",
  parent_summary:
    "A noun is a word that names a person, place, thing, or idea. Nouns can be common (general) or proper (specific, capitalized).",
  intuition:
    "Everything you can touch, see, visit, or talk about has a name. If you can point to it, visit it, or call someone by it, it's a noun!",
  notes: {
    overview:
      "A noun is one of the foundational parts of speech in grammar. Every sentence requires a subject, which is almost always a noun or a pronoun naming who or what is performing the action.",
    key_definitions: [
      { term: "Common Noun", meaning: "A general name for any person, place, or thing (e.g., city, teacher, book). Never capitalized unless starting a sentence." },
      { term: "Proper Noun", meaning: "The specific, official name of a particular person, place, or thing (e.g., London, Mrs. Smith, Harry Potter). Always capitalized!" },
      { term: "Concrete Noun", meaning: "Something you can detect with your 5 senses—touch, see, smell, taste, or hear (e.g., apple, bell, rain)." },
      { term: "Abstract Noun", meaning: "An idea, emotion, or concept that you cannot physically touch (e.g., bravery, love, honesty, friendship)." },
    ],
    core_rules: [
      "Rule of Proper Nouns: Always start with a capital letter (e.g., New York, Monday, July).",
      "Singular vs Plural: Add -s or -es for regular plurals (cat ➔ cats, box ➔ boxes).",
      "Possessive Nouns: Add 's to show ownership (the boy's dog).",
    ],
    real_world_examples: [
      "Around the house: 'table', 'refrigerator', 'blanket' (things).",
      "Family & Friends: 'Mom', 'brother', 'doctor' (people).",
      "Neighborhood: 'park', 'grocery store', 'school' (places).",
    ],
    parent_cheat_sheet: [
      "The 'A/The' Test: If you can put 'a' or 'the' in front of a word, it is usually a noun (e.g. 'the table', 'a dog').",
      "Watch out for verbs: Make sure your child doesn't confuse what someone DOES (run, jump) with WHO or WHAT they are.",
    ],
  },
  steps: [
    "Ask: Is this word naming someone (person)? e.g., teacher, doctor, Mom.",
    "Ask: Is this word naming a location (place)? e.g., park, school, London.",
    "Ask: Is this word naming an object you can touch (thing)? e.g., ball, book, car.",
    "Ask: Is it capitalized because it's a specific name (proper noun)? e.g., Sarah, Disney World.",
  ],
  common_mistakes: [
    "Confusing nouns with action words (verbs) like 'running' or 'jumping'.",
    "Forgetting to capitalize proper nouns (e.g. writing 'paris' instead of 'Paris').",
    "Confusing describing words (adjectives) with nouns (e.g. thinking 'red' in 'red apple' is the noun).",
  ],
  kid_script:
    "Look around the room right now! The table, your shoes, and your dog Max are all nouns because they are people, places, or things. If it has a name or you can touch it, it's a noun!",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question:
        "Identify the noun in this sentence: 'The puppy ran quickly.'",
      hint: "Which word names an animal that you can touch and cuddle?",
      answer: "puppy",
      solution_steps: [
        "'puppy' names an animal/thing (noun).",
        "'ran' is the action (verb).",
        "'quickly' describes how it ran (adverb).",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question: "Which of the following is a proper noun: city, Chicago, school, park?",
      hint: "Proper nouns name a specific place and start with a capital letter.",
      answer: "Chicago",
      solution_steps: [
        "'city', 'school', and 'park' are common nouns naming general places.",
        "'Chicago' is the specific name of a city and is capitalized, making it a proper noun.",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question:
        "Count the nouns in this sentence: 'Emma read an exciting book at the library.'",
      hint: "Look for person, thing, and place in the sentence.",
      answer: "3 nouns (Emma, book, library)",
      solution_steps: [
        "'Emma' is a person (proper noun).",
        "'book' is a thing (common noun).",
        "'library' is a place (common noun).",
        "Total count: 3 nouns.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question:
        "Change the common noun 'country' into a specific proper noun, and make a sentence with it.",
      hint: "Name any specific country in the world, like Canada, Japan, or India.",
      answer: "Example: Japan. 'We went on vacation to Japan.'",
      solution_steps: [
        "A proper noun for 'country' must be a specific nation.",
        "It must begin with a capital letter (e.g., Japan, France, Brazil).",
        "Use it correctly as the subject or object in a sentence.",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question:
        "In the sentence 'Swimming is my favorite sport', is 'swimming' a verb or a noun here? Explain why.",
      hint: "Is someone actively swimming right now, or is it the name of an activity/thing?",
      answer:
        "'Swimming' is functioning as a noun (specifically a gerund) because it is the name of the sport/subject of the sentence.",
      solution_steps: [
        "When an -ing verb acts as the subject of a sentence, it is called a gerund.",
        "Here, nobody is actively swimming in the action sense.",
        "It answers 'What is my favorite sport?' — naming the concept, making it a noun.",
      ],
    },
  ],
};

export function getSampleContent(
  topic: string,
  grade: number,
  subject: string
): GeneratedContent {
  const normalized = topic.toLowerCase().trim();

  if (normalized.includes("fraction")) {
    return { ...SAMPLE_FRACTIONS_CONTENT, grade, subject: subject || "Mathematics" };
  }
  if (normalized.includes("photo") || normalized.includes("plant")) {
    return { ...SAMPLE_PHOTOSYNTHESIS_CONTENT, grade, subject: subject || "Science" };
  }
  if (normalized.includes("noun") || normalized.includes("grammar")) {
    return { ...SAMPLE_NOUNS_CONTENT, grade, subject: subject || "English" };
  }

  // Dynamic fallback for any custom topic
  return {
    topic,
    grade,
    subject: subject || "General",
    parent_summary: `This lesson provides complete teaching notes on "${topic}" for a Grade ${grade} student, including definitions, principles, intuition, and 5 progressive practice problems.`,
    intuition: `To understand ${topic}, connect it to things your child encounters in everyday life. Avoid abstract jargon and start with a physical or relatable real-world comparison.`,
    notes: {
      overview: `Complete conceptual breakdown of ${topic}: At Grade ${grade} level, students are expected to grasp both the 'how' and the 'why' behind this concept. Use everyday analogies before introducing strict formulas.`,
      key_definitions: [
        { term: "Core Concept", meaning: `The fundamental principle of ${topic} explained in plain conversational terms.` },
        { term: "Application", meaning: `Where and how ${topic} is used in school and everyday problems.` },
      ],
      core_rules: [
        `Understand the problem statement before calculating.`,
        `Follow systematic step-by-step reasoning.`,
        `Verify whether the final result is realistic.`,
      ],
      real_world_examples: [
        `Connecting ${topic} to real objects at home, games, or nature.`,
      ],
      parent_cheat_sheet: [
        `Ask guiding questions instead of giving answers immediately.`,
        `Celebrate the child's effort and logical thinking.`,
      ],
    },
    steps: [
      `Introduce ${topic} with a simple real-world example.`,
      `Explain the core rule or mechanism step-by-step.`,
      `Work through one sample problem together while asking your child guiding questions.`,
      `Have your child try a problem on their own and celebrate their effort.`,
    ],
    common_mistakes: [
      `Rushing to formulas before the child visualizes the concept.`,
      `Assuming prior vocabulary without checking understanding.`,
      `Focusing only on the final answer rather than the process.`,
    ],
    kid_script: `Let's look at ${topic} together! It might seem tricky at first, but once you see the pattern, it's like solving a puzzle. Let's do the first one together!`,
    problems: [
      {
        id: "p1",
        difficulty: "easy",
        question: `Introductory concept question about ${topic}: Can you name the key idea behind ${topic}?`,
        hint: "Think back to the first rule we talked about.",
        answer: `The fundamental rule of ${topic}.`,
        solution_steps: [
          "State the definition clearly in your own words.",
          "Check that it matches the core lesson concept.",
        ],
      },
      {
        id: "p2",
        difficulty: "easy-medium",
        question: `Step-by-step practice: How would you start solving a problem involving ${topic}?`,
        hint: "What is step 1 in the explanation?",
        answer: "Begin by identifying the given values and what is being asked.",
        solution_steps: [
          "Read the question carefully.",
          "List what is known and unknown.",
        ],
      },
      {
        id: "p3",
        difficulty: "medium",
        question: `Standard application problem for ${topic} at Grade ${grade} level.`,
        hint: "Apply the step-by-step method from the lesson guide.",
        answer: "Standard applied solution.",
        solution_steps: [
          "Apply step 1.",
          "Perform the calculation or logical deduction.",
          "Verify the result makes intuitive sense.",
        ],
      },
      {
        id: "p4",
        difficulty: "medium-hard",
        question: `Spot the error: A student tried to solve a ${topic} problem but got confused. What mistake did they likely make?`,
        hint: "Review the common mistakes section.",
        answer: "They forgot to check the conditions before applying the rule.",
        solution_steps: [
          "Analyze the student's reasoning.",
          "Identify where the logical flaw occurred.",
          "Correct the approach.",
        ],
      },
      {
        id: "p5",
        difficulty: "challenge",
        question: `Challenge problem: Combine ${topic} with a multi-step real-world scenario.`,
        hint: "Break the challenge into two smaller, manageable questions.",
        answer: "Complete multi-step verified solution.",
        solution_steps: [
          "Break down the problem into sub-tasks.",
          "Solve each part systematically.",
          "Combine the results for the final answer.",
        ],
      },
    ],
  };
}
