import type { GeneratedContent } from "../../schemas/content.ts";
import type { LanguageCode } from "../constants/languages.ts";
import {
  SAMPLE_FRACTIONS_CONTENT,
  SAMPLE_PHOTOSYNTHESIS_CONTENT,
  SAMPLE_NOUNS_CONTENT,
} from "./sample-content.ts";

// --- RATIONAL AND IRRATIONAL NUMBERS ---
const RATIONAL_NUMBERS_EN: GeneratedContent = {
  topic: "Rational and Irrational Numbers",
  grade: 8,
  subject: "Mathematics",
  parent_summary:
    "A rational number is any number that can be written as a fraction (a/b) of two whole integers. An irrational number can NEVER be written as a fraction; its decimals go on forever without ever repeating in a pattern (like π or √2).",
  intuition:
    "Look at the word: 'RATIO-nal'. If a number can be expressed as a clean ratio of two integers (like sharing 3 pizzas among 4 people = 3/4 = 0.75), it makes clean ratio sense! But nature also has numbers like the diagonal across a 1-meter square (√2 ≈ 1.41421356...). No matter how long you write its decimals, it never stops and never repeats—it's irrational!",
  notes: {
    overview:
      "All real numbers belong to one of two mutually exclusive groups: Rational (ℚ) or Irrational. Every real number is either one or the other. Understanding this distinction is a major milestone in Grade 8 mathematics that prepares students for algebra, geometry, and higher calculus.",
    key_definitions: [
      {
        term: "Rational Number (ℚ)",
        meaning:
          "Any number that can be expressed in the form p/q, where p and q are integers and q ≠ 0. Examples: 5 (= 5/1), -3, 0.75 (= 3/4), 0.333... (= 1/3).",
      },
      {
        term: "Irrational Number",
        meaning:
          "A real number that cannot be written as a ratio of two integers. In decimal form, it is non-terminating AND non-repeating. Examples: √2, √3, √5, π (pi), e.",
      },
      {
        term: "Terminating Decimal",
        meaning:
          "A decimal that comes to an end after a finite number of digits (e.g., 1/4 = 0.25, 3/8 = 0.375). Always Rational.",
      },
      {
        term: "Repeating (Recurring) Decimal",
        meaning:
          "A decimal where a digit or group of digits repeats forever in a loop (e.g., 1/3 = 0.333..., 2/11 = 0.181818...). Always Rational!",
      },
      {
        term: "Square Root (√)",
        meaning:
          "The square root of any non-perfect square is ALWAYS irrational (√2, √3, √5, √7). But square roots of perfect squares are rational (√4 = 2, √9 = 3, √16 = 4).",
      },
    ],
    core_rules: [
      "The 'Ratio' Rule: If it can be written as integer/integer, it is Rational.",
      "The Decimal Test: Terminating decimal ➔ Rational. Repeating pattern decimal ➔ Rational. Non-terminating & non-repeating ➔ Irrational.",
      "Arithmetic with Irrationals: Rational + Irrational is ALWAYS Irrational (e.g., 3 + √2 is irrational).",
      "Multiplication Rule: A non-zero Rational × Irrational is ALWAYS Irrational (e.g., 5√3 is irrational).",
      "Square Root Rule: If n is not a perfect square, √n is guaranteed to be irrational.",
      "Pi is Irrational: π ≈ 3.14159265... is irrational. Note that 22/7 is only an approximation used for calculations.",
    ],
    real_world_examples: [
      "The Square Tile Diagonal: If you have a tile 1 meter by 1 meter, the diagonal corner-to-corner is exactly √2 meters (Pythagorean theorem: 1² + 1² = 2). You can touch that diagonal in real life, yet its decimal measurement never ends!",
      "Bicycle Wheels and Circles (π): The distance a bike wheel travels in one complete turn is π × diameter. Pi is the eternal irrational constant of all circles.",
      "Money and Baking: All currency ($3.50 = 7/2) and kitchen cup measurements (1/2 cup, 3/4 cup) are rational numbers.",
    ],
    parent_cheat_sheet: [
      "Memory Hook: Tell your child to look at the first 5 letters: RATIO-nal. Can you write it as a ratio (fraction)? Yes ➔ Rational!",
      "Repeating decimals trick children: Children often think 0.3333... is irrational because it doesn't stop. Remind them: It LOOPS with a pattern, so it is Rational (1/3)!",
      "Clarify 22/7: 22/7 is a rational number used as a close estimate for π, but true π cannot be written as a fraction.",
    ],
  },
  steps: [
    "Step 1: Check if the number is already written as a fraction of two integers. If yes, it's Rational.",
    "Step 2: If it's a whole number or integer (like 7 or -4), it's Rational because 7 = 7/1.",
    "Step 3: If it's a decimal, check if it terminates (stops) or has a repeating pattern. If it stops or repeats, it's Rational.",
    "Step 4: If it's a square root, check if the number inside is a perfect square (1, 4, 9, 16, 25, 36, 49, 64, 81, 100). If not, it's Irrational.",
    "Step 5: Check for famous mathematical constants like π (pi), which are always Irrational.",
  ],
  common_mistakes: [
    "Thinking all decimals that never end are irrational (forgetting that repeating decimals like 0.666... = 2/3 are rational).",
    "Believing π is rational because of the school approximation 22/7.",
    "Assuming square roots are always irrational (forgetting that √4 = 2, √9 = 3, √16 = 4 are whole rational numbers).",
    "Thinking zero is not rational (0 is rational because 0 = 0/1).",
  ],
  kid_script:
    "Look at the word 'Rational'—it starts with 'Ratio'! A ratio is just a fraction. If you can write a number as a clean fraction like 3/4 or even a whole number like 5 (which is 5/1), it's Rational—it makes sense! But imagine a mystery number whose decimals keep going forever and never repeat any pattern at all, like π or √2. Those are Irrational numbers—they refuse to be written as a simple fraction!",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question:
        "Classify the following numbers as Rational or Irrational: (A) 3/4, (B) -8, (C) √9.",
      hint: "Can each be written as an integer divided by an integer? Check if 9 is a perfect square.",
      answer: "All three are Rational numbers.",
      solution_steps: [
        "(A) 3/4 is already a ratio of two integers (3 and 4), so it is Rational.",
        "(B) -8 can be written as -8/1, so it is Rational.",
        "(C) √9 = 3, which is 3/1, so it is Rational.",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question:
        "Is the square root of 20 (√20) rational or irrational? Explain why.",
      hint: "Is 20 a perfect square like 16 or 25?",
      answer: "√20 is an Irrational number.",
      solution_steps: [
        "Check perfect squares nearby: 4² = 16 and 5² = 25.",
        "20 is between 16 and 25 and is not a perfect square.",
        "The square root of any non-perfect square is always non-terminating and non-repeating, making √20 irrational.",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question:
        "A student says: '0.333... goes on forever, so it must be an irrational number.' Are they correct? Explain.",
      hint: "Does 0.333... have a repeating pattern, and can it be converted to a fraction?",
      answer: "No, the student is incorrect. 0.333... is a Rational number.",
      solution_steps: [
        "A number is only irrational if its decimal is BOTH non-terminating AND non-repeating.",
        "0.333... has a repeating pattern (the digit 3 repeats infinitely).",
        "Repeating decimals can be written as fractions: 0.333... = 1/3. Since 1/3 is a ratio of integers, it is Rational.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question:
        "If you add a rational number (like 5) to an irrational number (like √2), is the resulting sum (5 + √2) rational or irrational?",
      hint: "If you add a clean number to a decimal that never ends and never repeats, does the result stop or repeat?",
      answer: "The sum is always Irrational.",
      solution_steps: [
        "√2 = 1.41421356...",
        "5 + √2 = 6.41421356...",
        "Adding 5 simply changes the whole number part; the decimal expansion remains non-terminating and non-repeating.",
        "Therefore, Rational + Irrational is always Irrational.",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question:
        "Which of the following numbers is Irrational: (A) 0.121212..., (B) √49, (C) 3.14159..., (D) 0.25?",
      hint: "Look for the number whose decimals continue indefinitely without any repeating cycle.",
      answer: "(C) 3.14159... (Pi) is the irrational number.",
      solution_steps: [
        "(A) 0.121212... repeats the block '12' forever, so it equals 12/99 = 4/33 (Rational).",
        "(B) √49 = 7 = 7/1 (Rational).",
        "(C) 3.14159... represents π, where decimals never settle into a repeating loop (Irrational).",
        "(D) 0.25 terminates and equals 1/4 (Rational).",
      ],
    },
  ],
};

const RATIONAL_NUMBERS_HI: GeneratedContent = {
  ...RATIONAL_NUMBERS_EN,
  topic: "परिमेय और अपरिमेय संख्याएँ (Rational and Irrational Numbers)",
  subject: "गणित (Mathematics)",
  parent_summary:
    "परिमेय संख्या (Rational Number) वह संख्या है जिसे दो पूर्णांकों के भिन्न (p/q) के रूप में लिखा जा सकता है। अपरिमेय संख्या (Irrational Number) को कभी भी भिन्न के रूप में नहीं लिखा जा सकता; इसका दशमलव रूप अनंत तक चलता रहता है और कभी दोहराता नहीं है (जैसे π या √2)।",
  intuition:
    "शब्द पर ध्यान दें: 'परिमेय' यानी जिसका सही अनुपात या माप संभव हो (जैसे 3/4 = 0.75 या 5 = 5/1)। लेकिन प्रकृति में कुछ ऐसी संख्याएँ भी हैं जैसे एक 1x1 वर्ग का विकर्ण (√2 ≈ 1.4142...) या वृत्त की परिधि (π)—इनके दशमलव कभी खत्म नहीं होते और न ही कोई पैटर्न दोहराते हैं। इसलिए इन्हें 'अपरिमेय' कहा जाता है!",
  notes: {
    overview:
      "सभी वास्तविक संख्याएँ (Real Numbers) दो में से एक समूह में आती हैं: या तो परिमेय या अपरिमेय। कक्षा 8 के गणित में यह एक अत्यंत महत्वपूर्ण अवधारणा है जो बीजगणित और ज्यामिति का आधार बनती है।",
    key_definitions: [
      {
        term: "परिमेय संख्या (Rational Number ℚ)",
        meaning:
          "ऐसी संख्या जिसे p/q के रूप में व्यक्त किया जा सके, जहाँ p और q पूर्णांक (integers) हैं और q ≠ 0। उदाहरण: 3/4, -5, 0, 0.25, 0.333...",
      },
      {
        term: "अपरिमेय संख्या (Irrational Number)",
        meaning:
          "ऐसी वास्तविक संख्या जिसे p/q के रूप में नहीं लिखा जा सकता। इसका दशमलव प्रसार असांत (Non-terminating) और अनावर्ती (Non-repeating) होता है। उदाहरण: √2, √3, √5, π।",
      },
      {
        term: "सांत दशमलव (Terminating Decimal)",
        meaning:
          "वह दशमलव जो कुछ अंकों के बाद समाप्त हो जाता है (जैसे 1/4 = 0.25, 1/2 = 0.5)। यह हमेशा परिमेय होता है।",
      },
      {
        term: "असांत आवर्ती दशमलव (Repeating Decimal)",
        meaning:
          "वह दशमलव जिसमें कोई अंक या समूह बार-बार दोहराता है (जैसे 1/3 = 0.333..., 2/3 = 0.666...)। यह हमेशा परिमेय संख्या होती है!",
      },
      {
        term: "पूर्ण वर्ग और वर्गमूल (Square Roots)",
        meaning:
          "पूर्ण वर्ग संख्याओं का वर्गमूल परिमेय होता है (जैसे √4 = 2, √9 = 3, √16 = 4)। लेकिन जो पूर्ण वर्ग नहीं हैं, उनका वर्गमूल हमेशा अपरिमेय होता है (जैसे √2, √3, √5, √7)।",
      },
    ],
    core_rules: [
      "पहला नियम: यदि संख्या को भिन्न (पूर्णांक/पूर्णांक) के रूप में लिखा जा सके, तो वह परिमेय है।",
      "दशमलव नियम: सांत दशमलव ➔ परिमेय। आवर्ती (दोहराने वाला) दशमलव ➔ परिमेय। असांत और अनावर्ती (न रुकने वाला, न दोहराने वाला) ➔ अपरिमेय।",
      "जोड़ का नियम: परिमेय + अपरिमेय हमेशा अपरिमेय होता है (जैसे 5 + √2 अपरिमेय है)।",
      "गुणा का नियम: शून्य के अलावा किसी भी परिमेय संख्या को अपरिमेय से गुणा करने पर परिणाम हमेशा अपरिमेय होता है (जैसे 3√2 अपरिमेय है)।",
      "पाई (π) का नियम: पाई हमेशा अपरिमेय संख्या है। 22/7 केवल इसका एक अनुमानित मान है, वास्तविक पाई नहीं।",
    ],
    real_world_examples: [
      "कमरे की टाइल का विकर्ण: 1 मीटर लंबी और 1 मीटर चौड़ी टाइल के एक कोने से दूसरे कोने की दूरी √2 मीटर होती है। आप इसे छू सकते हैं, पर इसका दशमलव मान कभी समाप्त नहीं होता!",
      "साइकिल का पहिया (π): पहिए द्वारा एक चक्कर में तय की गई दूरी π × व्यास होती है।",
      "दैनिक लेनदेन: सभी रुपये-पैसे और माप (1/2 लीटर दूध, 2.50 रुपये) परिमेय संख्याएँ हैं।",
    ],
    parent_cheat_sheet: [
      "बच्चे को याद रखने की ट्रिक: शब्द में 'अनुपात' छुपा है। अगर भिन्न बना सकते हैं, तो परिमेय है!",
      "0.333... का भ्रम दूर करें: बच्चे सोचते हैं कि जो कभी खत्म न हो वह अपरिमेय है। उन्हें बताएं कि 0.333... में एक पैटर्न दोहरा रहा है, इसलिए यह 1/3 (परिमेय) है।",
      "22/7 को समझाएं: 22/7 परिमेय है, लेकिन असली पाई (π) अपरिमेय है। 22/7 सिर्फ हिसाब लगाने के लिए आसान मान है।",
    ],
  },
  kid_script:
    "सोचो अगर तुम किसी संख्या को दो पूरे नंबरों के भिन्न (जैसे 3/4 या 5/1) में लिख सकते हो, तो वह 'परिमेय' संख्या है—यानी उसका पक्का हिसाब है! लेकिन कुछ संख्याएं इतनी रहस्यमयी होती हैं कि उनके दशमलव कभी खत्म ही नहीं होते और कोई पैटर्न भी नहीं दोहराते, जैसे π या √2। उन्हें हम 'अपरिमेय' संख्याएं कहते हैं!",
};

// --- SIMILARITY OF TRIANGLES ---
const TRIANGLES_EN: GeneratedContent = {
  topic: "Similarity of Triangles",
  grade: 7,
  subject: "Mathematics",
  parent_summary:
    "Two triangles are 'similar' if they have the exact same shape, even if one is enlarged or shrunk. Their corresponding angles are equal, and the lengths of their corresponding sides are in the same ratio.",
  intuition:
    "Think of zooming in or out on a photo of a triangle on your phone. The zoomed-in triangle looks larger, but all the corner angles stay exactly the same, and every side grows by the exact same multiplier! They are identical in shape, just different in scale.",
  notes: {
    overview:
      "In Euclidean geometry, two figures are similar if one can be transformed into the other by uniform scaling (enlarging or shrinking), possibly combined with translation, rotation, and reflection. For triangles, if the angles match, the sides are guaranteed to be in strict proportion.",
    key_definitions: [
      {
        term: "Similar Triangles (~) ",
        meaning: "Triangles with the exact same shape (equal corresponding angles) and proportional sides.",
      },
      {
        term: "Scale Factor (k)",
        meaning: "The constant ratio of any side length in Triangle 2 to the corresponding side length in Triangle 1 (e.g., Side B / Side A).",
      },
      {
        term: "Corresponding Sides & Angles",
        meaning: "The sides and angles that are in the matching relative positions across the two triangles.",
      },
      {
        term: "Congruence vs Similarity",
        meaning: "Congruent (≅) means same shape AND same size (k = 1). Similar (~) means same shape, but sizes can differ.",
      },
    ],
    core_rules: [
      "AAA (Angle-Angle-Angle) Rule: If all 3 pairs of corresponding angles are equal, the triangles are similar.",
      "SSS (Side-Side-Side) Proportion Rule: If side_a1/side_a2 = side_b1/side_b2 = side_c1/side_c2, the triangles are similar.",
      "SAS (Side-Angle-Side) Rule: If two pairs of sides are in equal proportion and the included angle between them is equal, they are similar.",
      "Area Ratio Rule: If the scale factor of sides is k, the ratio of their areas is always k² (e.g. side ratio 1:3 ➔ area ratio 1:9).",
    ],
    real_world_examples: [
      "Shadow Reckoning (Thales Method): How Greek mathematicians measured the height of the Great Pyramids using the shadow of a simple walking stick.",
      "Smartphone Pinch-to-Zoom: Enlarging a triangle photo doesn't change any corner angles, only the length of the boundaries.",
      "Architectural Blueprints & Maps: A floor plan triangle is similar to the actual room layout at a scale of 1:100.",
    ],
    parent_cheat_sheet: [
      "Proportion cross-multiplication: If a/b = c/x, then x = (b × c) / a.",
      "Corner angles NEVER change when scaling up or down—only side lengths do!",
      "Always check matching sides: Smallest side with smallest side, largest side with largest side.",
    ],
  },
  steps: [
    "Check the angles: If all corresponding angles of two triangles are equal (AAA rule), they are similar.",
    "Check the side ratios: Compare matching sides (e.g. side A / side B). If all pairs have the same ratio (SSS rule), they are similar.",
    "Check Side-Angle-Side (SAS): If two pairs of sides have equal ratios and the angle between them is equal, they are similar.",
    "Remember: Congruent means same shape AND same size; Similar means same shape, but can be DIFFERENT sizes.",
  ],
  common_mistakes: [
    "Confusing similarity with congruence (thinking similar triangles must have equal sides).",
    "Pairing the wrong sides when writing proportions—always match short side with short side, and long side with long side.",
    "Forgetting that angles stay equal even when side lengths double or triple.",
  ],
  kid_script:
    "Look at this small toy car and a real car. They have the exact same shape, but one is just smaller! Similar triangles work the same way—one is just a scaled-up or scaled-down version of the other. The corners don't change at all, only how big the triangle is!",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question:
        "If Triangle ABC has angles 50°, 60°, and 70°, and Triangle DEF has angles 50°, 60°, and 70°, are they similar? Why?",
      hint: "Check if all corresponding angles match (AAA similarity criterion).",
      answer: "Yes, they are similar by the AAA (Angle-Angle-Angle) rule.",
      solution_steps: [
        "All three angles in Triangle ABC match Triangle DEF (50°, 60°, 70°).",
        "When all corresponding angles are equal, triangles are guaranteed to be similar.",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question:
        "Triangle 1 has sides 3 cm, 4 cm, and 5 cm. Triangle 2 has sides 6 cm, 8 cm, and 10 cm. What is the scale factor?",
      hint: "Divide the matching sides of Triangle 2 by Triangle 1 (e.g., 6 ÷ 3).",
      answer: "The scale factor is 2 (each side is doubled).",
      solution_steps: [
        "Compare matching sides: 6 ÷ 3 = 2, 8 ÷ 4 = 2, and 10 ÷ 5 = 2.",
        "Since the ratio is constant (2), Triangle 2 is twice as large as Triangle 1.",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question:
        "Two triangles are similar. Triangle A has sides 4 cm and 6 cm. The corresponding shorter side of Triangle B is 8 cm. What is the length of Triangle B's longer side?",
      hint: "Set up a proportion: 4 / 8 = 6 / x.",
      answer: "12 cm",
      solution_steps: [
        "Find the multiplier: 8 ÷ 4 = 2.",
        "Multiply the corresponding longer side by 2: 6 × 2 = 12 cm.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question:
        "A 6-foot-tall parent casts a 4-foot shadow. At the same moment, a tree casts a 20-foot shadow. Using similar triangles, how tall is the tree?",
      hint: "Sunlight creates similar right triangles: (Parent Height / Parent Shadow) = (Tree Height / Tree Shadow).",
      answer: "30 feet tall",
      solution_steps: [
        "Ratio: Height / Shadow = 6 / 4 = 1.5.",
        "Apply ratio to the tree: Tree Height = 20 × 1.5 = 30 feet.",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question:
        "If two triangles are similar and the scale factor of their sides is 1:3, what is the ratio of their areas?",
      hint: "Area depends on (base × height). If both base and height are multiplied by 3, what happens to the area?",
      answer: "1:9 (Area ratio is the square of the side ratio, 3² = 9).",
      solution_steps: [
        "When side lengths are scaled by a factor k, the area scales by k².",
        "Here k = 3, so area multiplier = 3 × 3 = 9.",
        "Ratio of areas = 1:9.",
      ],
    },
  ],
};

const TRIANGLES_HI: GeneratedContent = {
  ...TRIANGLES_EN,
  topic: "त्रिभुजों की समरूपता (Similarity of Triangles)",
  subject: "गणित (Mathematics)",
  parent_summary:
    "दो त्रिभुज 'समरूप' (Similar) तब कहलाते हैं जब उनका आकार (Shape) बिल्कुल एक जैसा हो, भले ही उनका माप (Size) छोटा या बड़ा हो। उनके संगत कोण बराबर होते हैं और संगत भुजाओं का अनुपात समान होता है।",
  intuition:
    "अपने फोन में किसी त्रिभुज की फोटो को ज़ूम करने की कल्पना करें। ज़ूम करने पर त्रिभुज बड़ा दिखता है, लेकिन उसके कोने (कोण) बिल्कुल वही रहते हैं और हर भुजा एक समान अनुपात में बढ़ती है! इसे ही समरूपता कहते हैं।",
  notes: {
    overview:
      "ज्यामिति में, दो आकृतियां समरूप होती हैं यदि उनके कोण समान हों और उनकी भुजाएं एक निश्चित अनुपात (Scale Factor) में हों। इसका उपयोग छाया से ऊँचाई मापने, मानचित्र बनाने और इंजीनियरिंग में बड़े पैमाने पर होता है।",
    key_definitions: [
      {
        term: "समरूप त्रिभुज (Similar Triangles ~)",
        meaning: "समान आकार वाले त्रिभुज जिनके संगत कोण बराबर और संगत भुजाएं आनुपातिक होती हैं।",
      },
      {
        term: "स्केल फैक्टर (Scale Factor / k)",
        meaning: "संगत भुजाओं का अनुपात (जैसे त्रिभुज 2 की भुजा / त्रिभुज 1 की भुजा)।",
      },
      {
        term: "संगत भुजाएं (Corresponding Sides)",
        meaning: "दोनों त्रिभुजों में एक जैसी स्थिति वाली भुजाएं (जैसे सबसे छोटी भुजा के साथ सबसे छोटी भुजा)।",
      },
      {
        term: "सर्वांगसमता बनाम समरूपता",
        meaning: "सर्वांगसम (Congruent) = समान आकार और समान नाप। समरूप (Similar) = समान आकार, लेकिन अलग-अलग नाप हो सकता है।",
      },
    ],
    core_rules: [
      "AAA (कोण-कोण-कोण) नियम: यदि तीनों संगत कोण बराबर हैं, तो त्रिभुज समरूप होंगे।",
      "SSS (भुजा-भुजा-भुजा) अनुपात नियम: यदि तीनों संगत भुजाओं का अनुपात बराबर है, तो त्रिभुज समरूप होंगे।",
      "SAS नियम: यदि दो भुजाओं का अनुपात समान है और उनके बीच का कोण बराबर है, तो त्रिभुज समरूप होंगे।",
      "क्षेत्रफल का अनुपात नियम: यदि भुजाओं का अनुपात k है, तो क्षेत्रफलों का अनुपात k² होता है (जैसे भुजा 1:3 ➔ क्षेत्रफल 1:9)।",
    ],
    real_world_examples: [
      "छाया से पेड़ या मीनार की ऊँचाई नापना: सूरज की किरणें जमीन और वस्तु के साथ समरूप त्रिभुज बनाती हैं।",
      "खिलौना कार और असली कार: दोनों का आकार एक है, केवल स्केल अलग है।",
      "घर का नक्शा (Map/Blueprint): नक्शे पर बना त्रिभुज और कमरे का वास्तविक त्रिभुज समरूप होते हैं।",
    ],
    parent_cheat_sheet: [
      "बच्चे को बताएं: कोण (Angles) ज़ूम करने पर कभी नहीं बदलते, केवल भुजाओं की लंबाई बदलती है!",
      "तुलना हमेशा सही भुजाओं की करें: सबसे छोटी भुजा की तुलना सबसे छोटी से और सबसे बड़ी की सबसे बड़ी से।",
    ],
  },
  kid_script:
    "एक खिलौना कार और एक असली कार को देखो! दोनों का आकार बिल्कुल एक जैसा है, बस एक छोटी है और एक बड़ी। समरूप त्रिभुज भी बिल्कुल ऐसे ही होते हैं—एक ही आकार, बस छोटा या बड़ा स्केल! कोने (कोण) बिल्कुल नहीं बदलते, सिर्फ भुजाओं की लंबाई बदलती है।",
};

// --- COMPARING QUANTITIES (CLASS 7) ---
const COMPARING_QUANTITIES_EN: GeneratedContent = {
  topic: "Comparing Quantities: Understanding percentages, converting fractions and decimals into percentages, finding percentages of quantities, profit and loss, and simple interest",
  grade: 7,
  subject: "Mathematics",
  parent_summary:
    "Comparing Quantities teaches your child how different numbers relate to one another in everyday life using ratios, percentages, profit & loss, and simple interest. It answers practical questions like 'How much discount am I getting?' and 'How much money does a bank investment earn?'",
  intuition:
    "Think of 'percent' as literally 'per hundred' (centum = 100). When you score 18 out of 20 on a quiz, what would that score be if the test had 100 marks? Ratios scale things to a standard yardstick of 100 so you can compare any two quantities fairly!",
  notes: {
    overview:
      "In Grade 7 mathematics, Comparing Quantities connects arithmetic to real financial and physical scenarios. The chapter covers: 1) Converting fractions and decimals to percentages and vice versa, 2) Finding percentages of amounts, 3) Calculating Profit and Loss on transactions, and 4) Computing Simple Interest on borrowed or invested money.",
    key_definitions: [
      {
        term: "Percentage (%)",
        meaning:
          "A fraction or ratio where the denominator is always 100. For example, 25% = 25/100 = 0.25 = 1/4.",
      },
      {
        term: "Cost Price (CP) & Selling Price (SP)",
        meaning:
          "Cost Price is the buying/production price. Selling Price is the sale price. If SP > CP, there is Profit. If CP > SP, there is Loss.",
      },
      {
        term: "Profit & Loss Percentages",
        meaning:
          "Profit % = (Profit ÷ CP) × 100. Loss % = (Loss ÷ CP) × 100. Note: Profit and Loss percentages are ALWAYS calculated on Cost Price!",
      },
      {
        term: "Principal (P) & Rate (R)",
        meaning:
          "Principal is the initial money borrowed or deposited. Rate is the percentage charged or earned per year (annual rate).",
      },
      {
        term: "Simple Interest (SI) & Amount (A)",
        meaning:
          "Interest paid only on original principal: SI = (P × R × T) / 100. The total repayable sum is Amount = Principal + Interest.",
      },
    ],
    core_rules: [
      "Fraction to Percentage Rule: Multiply the fraction by 100% (e.g., 3/5 × 100 = 60%).",
      "Decimal to Percentage Rule: Multiply by 100 or shift the decimal point 2 places right (e.g., 0.45 = 45%).",
      "Percentage of Quantity: (Percentage ÷ 100) × Quantity (e.g., 25% of 200 = (25/100) × 200 = 50).",
      "Profit & Loss Rule: Profit = SP - CP. Loss = CP - SP. Always divide by CP, never SP, to find percentage.",
      "Simple Interest Formula: SI = (P × R × T) / 100, where T must be measured in years.",
    ],
    real_world_examples: [
      "Store Discounts: A pair of sneakers originally ₹2,000 has a 20% discount. The discount is ₹400; you pay ₹1,600.",
      "Sports Win Rates: A cricket team that wins 15 out of 20 matches has a win rate of (15/20) × 100 = 75%.",
      "Bank Savings: If you put ₹10,000 into a savings bond at 6% annual interest for 3 years, the simple interest is (10000 × 6 × 3) / 100 = ₹1,800.",
    ],
    parent_cheat_sheet: [
      "The 'Per Cent' rule: Remind your child that 'Cent' means 100 (like century or 100 cents in a dollar).",
      "The CP trap: Children often divide by SP when calculating profit percent. Emphasize: Profit is ALWAYS judged relative to what you originally paid (CP).",
      "Time in SI: If a problem states time in months (e.g. 6 months), remind them to convert to years: 6/12 = 0.5 years.",
    ],
  },
  steps: [
    "Step 1: Check what is given (fraction, decimal, percentage, or money values) and what needs to be found.",
    "Step 2: If converting to percentage, multiply by 100. If converting from percentage, divide by 100.",
    "Step 3: For Profit or Loss, compute the difference between SP and CP first, then calculate (Difference ÷ CP) × 100.",
    "Step 4: For Simple Interest, identify P, R, and T (in years) and calculate (P × R × T) / 100.",
    "Step 5: Check whether the final value makes sense (e.g., selling price after profit must be greater than CP).",
  ],
  common_mistakes: [
    "Calculating Profit % or Loss % on the Selling Price (SP) instead of the Cost Price (CP).",
    "Forgetting to multiply by 100 when converting fractions to percentages (e.g. writing 3/5 instead of 60%).",
    "Using time in months directly in the Simple Interest formula without converting to years.",
    "Confusing the final Amount (P + SI) with the Simple Interest (SI) alone.",
  ],
  kid_script:
    "Imagine you and your friend are comparing your game scores. If you scored 18 out of 20 and your friend scored 42 out of 50, who did better? It's hard to tell at first glance because the totals are different! Percentages are like a magic equalizer that turns both scores into a score out of 100 so you can compare them fairly! Let's see how it works step-by-step.",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question: "Convert the fraction 3/5 into a percentage.",
      hint: "To convert any fraction into a percentage, multiply it by 100: (3/5) * 100.",
      answer: "60%",
      solution_steps: [
        "Multiply the fraction by 100: (3/5) * 100.",
        "Calculate: 3 * 20 = 60%.",
        "Therefore, 3/5 is equal to 60%.",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question: "Find 25% of 200.",
      hint: "Write 25% as (25/100) and multiply by 200.",
      answer: "50",
      solution_steps: [
        "Convert 25% to a fraction: 25/100 = 1/4.",
        "Multiply by 200: (1/4) * 200 = 50.",
        "25% of 200 is 50.",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question: "A book is bought for Rs 200 and sold for Rs 250. Calculate the profit percentage.",
      hint: "First find Profit = SP - CP. Then calculate Profit% = (Profit / CP) * 100.",
      answer: "25%",
      solution_steps: [
        "Cost Price (CP) = 200, Selling Price (SP) = 250.",
        "Profit = SP - CP = 250 - 200 = 50.",
        "Profit percentage = (Profit / CP) * 100 = (50 / 200) * 100 = 25%.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question: "Calculate the simple interest on a principal of Rs 1000 at an interest rate of 5% per year for 2 years.",
      hint: "Use the Simple Interest formula: SI = (P * R * T) / 100.",
      answer: "Rs 100",
      solution_steps: [
        "Identify given values: Principal (P) = 1000, Rate (R) = 5, Time (T) = 2 years.",
        "Apply formula: SI = (P * R * T) / 100 = (1000 * 5 * 2) / 100.",
        "Calculate: 1000 * 10 / 100 = 100.",
        "The simple interest is Rs 100.",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question: "An item marked at Rs 800 is sold at a 15% discount. What is the final selling price?",
      hint: "Calculate the discount amount (15% of 800) and subtract it from the marked price.",
      answer: "Rs 680",
      solution_steps: [
        "Find the discount amount: (15 / 100) * 800 = 120.",
        "Calculate Selling Price: Marked Price - Discount = 800 - 120 = 680.",
        "The final selling price is Rs 680.",
      ],
    },
  ],
};

const COMPARING_QUANTITIES_HI: GeneratedContent = {
  ...COMPARING_QUANTITIES_EN,
  topic: "राशियों की तुलना: प्रतिशत, लाभ और हानि, तथा साधारण ब्याज (Comparing Quantities)",
  subject: "गणित (Mathematics)",
  parent_summary:
    "राशियों की तुलना (Comparing Quantities) बच्चे को सिखाती है कि दैनिक जीवन में अनुपात, प्रतिशत (Percentages), लाभ-हानि (Profit & Loss) और साधारण ब्याज (Simple Interest) का उपयोग कैसे किया जाता है। यह 'दुकान पर कितनी छूट मिली?' और 'बैंक में पैसे रखने पर कितना ब्याज मिलता है?' जैसे रोजमर्रा के सवालों को हल करता है।",
  intuition:
    "'प्रतिशत' शब्द का शाब्दिक अर्थ है 'प्रति सौ' (हर 100 में से कितना)। जब कोई बच्चा 20 में से 18 अंक लाता है, तो 100 में से वह कितना होगा? प्रतिशत सभी संख्याओं को 100 के एक समान पैमाने पर लाकर खड़ा करता है ताकि हम किसी भी दो चीजों की निष्पक्ष तुलना कर सकें!",
  notes: {
    overview:
      "कक्षा 7 गणित में 'राशियों की तुलना' एक अत्यंत महत्वपूर्ण व्यावहारिक अध्याय है। इसमें शामिल हैं: 1) भिन्न और दशमलव को प्रतिशत में बदलना, 2) किसी राशि का प्रतिशत निकालना, 3) क्रय-विक्रय में लाभ और हानि प्रतिशत की गणना, तथा 4) मूलधन पर साधारण ब्याज निकालना।",
    key_definitions: [
      {
        term: "प्रतिशत (Percentage %)",
        meaning:
          "वह भिन्न जिसका हर हमेशा 100 होता है। जैसे 25% = 25/100 = 1/4 = 0.25।",
      },
      {
        term: "क्रय मूल्य (CP) और विक्रय मूल्य (SP)",
        meaning:
          "क्रय मूल्य (Cost Price) वह मूल्य है जिस पर वस्तु खरीदी गई। विक्रय मूल्य (Selling Price) वह मूल्य है जिस पर वस्तु बेची गई। यदि SP > CP तो लाभ, और CP > SP तो हानि होती है।",
      },
      {
        term: "लाभ एवं हानि प्रतिशत",
        meaning:
          "लाभ % = (लाभ ÷ क्रय मूल्य) × 100। हानि % = (हानि ÷ क्रय मूल्य) × 100। ध्यान दें: लाभ और हानि प्रतिशत हमेशा क्रय मूल्य (CP) पर ही निकाले जाते हैं!",
      },
      {
        term: "मूलधन (P) और ब्याज दर (R)",
        meaning:
          "मूलधन (Principal) वह प्रारंभिक धनराशि है जो उधार ली या बैंक में जमा की गई। दर (Rate) वार्षिक प्रतिशत ब्याज है।",
      },
      {
        term: "साधारण ब्याज (SI) और मिश्रधन (Amount)",
        meaning:
          "साधारण ब्याज = (मूलधन × दर × समय) / 100। मिश्रधन (Amount) = मूलधन + ब्याज।",
      },
    ],
    core_rules: [
      "भिन्न को प्रतिशत में बदलना: भिन्न को 100% से गुणा करें (जैसे 3/5 × 100 = 60%)।",
      "दशमलव को प्रतिशत में बदलना: 100 से गुणा करें या दशमलव बिंदु को 2 अंक दाईं ओर खिसकाएं (जैसे 0.45 = 45%)।",
      "किसी राशि का प्रतिशत: (प्रतिशत ÷ 100) × कुल राशि (जैसे 200 का 25% = (25/100) × 200 = 50)।",
      "लाभ-हानि नियम: लाभ = SP - CP, हानि = CP - SP। प्रतिशत के लिए हमेशा क्रय मूल्य (CP) से भाग दें।",
      "साधारण ब्याज का सूत्र: SI = (P × R × T) / 100, जहाँ समय (T) हमेशा वर्षों में होना चाहिए।",
    ],
    real_world_examples: [
      "दुकान पर छूट (Discounts): ₹2,000 के जूते पर 20% छूट का अर्थ है ₹400 की बचत, यानी अंतिम मूल्य ₹1,600।",
      "परीक्षा परिणाम: 50 में से 45 अंक प्राप्त करने का अर्थ है (45/50) × 100 = 90%।",
      "बैंक बचत खाता: ₹10,000 की जमा पर 6% वार्षिक दर से 3 साल का साधारण ब्याज ₹1,800 होता है।",
    ],
    parent_cheat_sheet: [
      "बच्चे को याद दिलाएं: 'प्रति-शत' का अर्थ है प्रति 100 में से हिस्सा।",
      "क्रय मूल्य की सावधानी: बच्चे अक्सर लाभ निकालते समय विक्रय मूल्य से भाग दे देते हैं। उन्हें बताएं कि लाभ हमेशा उस मूल्य पर देखा जाता है जितने में खरीदा था (CP)।",
      "समय वर्षों में: यदि प्रश्न में महीने दिए हों (जैसे 6 महीने), तो उसे वर्ष में बदलें: 6/12 = 0.5 वर्ष।",
    ],
  },
  steps: [
    "कदम 1: प्रश्न को ध्यान से पढ़ें और पहचानें कि क्या दिया गया है और क्या निकालना है।",
    "कदम 2: प्रतिशत में बदलने के लिए 100 से गुणा करें; प्रतिशत हटाने के लिए 100 से भाग दें।",
    "कदम 3: लाभ या हानि के लिए विक्रय मूल्य और क्रय मूल्य का अंतर निकालें, फिर (अंतर ÷ CP) × 100 करें।",
    "कदम 4: साधारण ब्याज के लिए मूलधन (P), दर (R) और समय (T) को सूत्र (P × R × T) / 100 में रखें।",
    "कदम 5: उत्तर की जांच करें कि क्या वह व्यावहारिक दृष्टि से सही लग रहा है।",
  ],
  common_mistakes: [
    "क्रय मूल्य (CP) की जगह विक्रय मूल्य (SP) पर लाभ या हानि प्रतिशत निकालना।",
    "भिन्न को प्रतिशत में बदलते समय 100 से गुणा करना भूल जाना।",
    "साधारण ब्याज के सूत्र में महीनों को सीधे रख देना (उन्हें वर्ष में बदले बिना)।",
    "कुल मिश्रधन (Amount) और ब्याज (Interest) में भ्रमित होना।",
  ],
  kid_script:
    "सोचो तुम और तुम्हारा दोस्त अपने गेम के अंकों की तुलना कर रहे हो। तुमने 20 में से 18 बनाए और तुम्हारे दोस्त ने 50 में से 42। कौन ज्यादा आगे है? ऐसे सीधे बताना मुश्किल है क्योंकि दोनों का कुल स्कोर अलग है! प्रतिशत एक ऐसा जादुई पैमाना है जो दोनों स्कोर्स को '100 में से कितने' में बदल देता है, जिससे तुलना करना बहुत आसान हो जाता है! चलो इसे साथ मिलकर सीखते हैं।",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question: "भिन्न 3/5 को प्रतिशत में बदलिए।",
      hint: "किसी भी भिन्न को प्रतिशत में बदलने के लिए उसे 100 से गुणा करें: (3/5) * 100.",
      answer: "60%",
      solution_steps: [
        "भिन्न को 100 से गुणा कीजिए: (3/5) * 100.",
        "गणना: 3 * 20 = 60%.",
        "अतः 3/5 का मान 60% के बराबर है।",
      ],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question: "200 का 25% ज्ञात कीजिए।",
      hint: "25% को (25/100) के रूप में लिखें और 200 से गुणा करें।",
      answer: "50",
      solution_steps: [
        "25% को भिन्न में बदलें: 25/100 = 1/4.",
        "200 से गुणा करें: (1/4) * 200 = 50.",
        "200 का 25% मान 50 है।",
      ],
    },
    {
      id: "p3",
      difficulty: "medium",
      question: "एक पुस्तक ₹200 में खरीदी गई और ₹250 में बेची गई। लाभ प्रतिशत ज्ञात कीजिए।",
      hint: "पहले लाभ = SP - CP ज्ञात करें। फिर लाभ% = (लाभ / CP) * 100 सूत्र लगाएं।",
      answer: "25%",
      solution_steps: [
        "क्रय मूल्य (CP) = 200, विक्रय मूल्य (SP) = 250.",
        "लाभ = SP - CP = 250 - 200 = 50.",
        "लाभ प्रतिशत = (लाभ / CP) * 100 = (50 / 200) * 100 = 25%.",
      ],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question: "₹1000 के मूलधन पर 5% वार्षिक ब्याज दर से 2 वर्ष का साधारण ब्याज ज्ञात कीजिए।",
      hint: "साधारण ब्याज का सूत्र प्रयोग करें: SI = (P * R * T) / 100.",
      answer: "Rs 100",
      solution_steps: [
        "मान पहचानें: मूलधन (P) = 1000, दर (R) = 5, समय (T) = 2 वर्ष।",
        "सूत्र लगाएं: SI = (P * R * T) / 100 = (1000 * 5 * 2) / 100.",
        "गणना करें: 1000 * 10 / 100 = 100.",
        "साधारण ब्याज ₹100 है।",
      ],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question: "₹800 अंकित मूल्य वाली एक वस्तु पर 15% छूट दी जाती है। वस्तु का अंतिम विक्रय मूल्य क्या होगा?",
      hint: "पहले छूट की राशि निकालें (800 का 15%) और फिर उसे अंकित मूल्य में से घटाएं।",
      answer: "Rs 680",
      solution_steps: [
        "छूट की राशि: (15 / 100) * 800 = 120.",
        "विक्रय मूल्य = अंकित मूल्य - छूट = 800 - 120 = 680.",
        "वस्तु का अंतिम विक्रय मूल्य ₹680 है।",
      ],
    },
  ],
};

export function getLocalizedContent(
  topic: string,
  grade: number,
  subject: string,
  lang: LanguageCode
): GeneratedContent {
  const normalized = topic.toLowerCase().trim();

  // Comparing Quantities (Class 7 Mathematics)
  if (
    normalized.includes("comparing") ||
    normalized.includes("quantities") ||
    normalized.includes("percentage") ||
    normalized.includes("profit") ||
    normalized.includes("simple interest") ||
    normalized.includes("राशियों की तुलना") ||
    normalized.includes("प्रतिशत")
  ) {
    if (lang === "hi") {
      return { ...COMPARING_QUANTITIES_HI, grade };
    }
    return { ...COMPARING_QUANTITIES_EN, grade, subject: subject || "Mathematics" };
  }

  // Rational and Irrational Numbers
  if (
    normalized.includes("rational") ||
    normalized.includes("irrational") ||
    normalized.includes("परिमेय") ||
    normalized.includes("अपरिमेय")
  ) {
    if (lang === "hi") {
      return { ...RATIONAL_NUMBERS_HI, grade };
    }
    return { ...RATIONAL_NUMBERS_EN, grade, subject: subject || "Mathematics" };
  }

  // Similarity of triangles
  if (normalized.includes("similar") || normalized.includes("triangle")) {
    if (lang === "hi") {
      return { ...TRIANGLES_HI, grade };
    }
    return { ...TRIANGLES_EN, grade, subject: subject || "Mathematics" };
  }

  // Fractions
  if (normalized.includes("fraction")) {
    return { ...SAMPLE_FRACTIONS_CONTENT, grade, subject: subject || "Mathematics" };
  }

  // Photosynthesis
  if (normalized.includes("photo") || normalized.includes("plant")) {
    return { ...SAMPLE_PHOTOSYNTHESIS_CONTENT, grade, subject: subject || "Science" };
  }

  // Nouns
  if (normalized.includes("noun") || normalized.includes("grammar")) {
    return { ...SAMPLE_NOUNS_CONTENT, grade, subject: subject || "English" };
  }

  // Comprehensive custom topic generator
  const titleTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  return {
    topic: titleTopic,
    grade,
    subject: subject || "General",
    parent_summary: `This parent teaching guide breaks down "${titleTopic}" for Grade ${grade}. It gives you the core intuition, complete teaching notes, key definitions, common traps, and 5 progressive practice questions.`,
    intuition: `To explain ${titleTopic} naturally, connect it to something your child can see, touch, or relate to in everyday life. Start with the intuition and 'why' before introducing formulas or technical terms.`,
    notes: {
      overview: `Complete conceptual breakdown of ${titleTopic}: At Grade ${grade} level, students need to understand both the underlying mechanism and how to apply it systematically. Emphasize concepts first, steps second.`,
      key_definitions: [
        {
          term: `Core Concept of ${titleTopic}`,
          meaning: `The foundational idea and definition explained in plain, conversational language.`,
        },
        {
          term: `Key Practical Principle`,
          meaning: `How this concept is used in school problems and real-world scenarios.`,
        },
      ],
      core_rules: [
        `Rule 1: Understand what is being asked before attempting calculations or solutions.`,
        `Rule 2: Follow a structured, step-by-step approach from start to finish.`,
        `Rule 3: Always check whether the final answer makes sense in the context of the problem.`,
      ],
      real_world_examples: [
        `Relating ${titleTopic} to everyday household objects, nature, games, or sports.`,
        `A relatable comparison that makes the concept click instantly.`,
      ],
      parent_cheat_sheet: [
        `Ask guiding questions (e.g. 'What do you notice first?') rather than immediately giving the answer.`,
        `Praise the child's thought process and problem-solving effort.`,
      ],
    },
    steps: [
      `Introduce ${titleTopic} with a simple, familiar real-world scenario.`,
      `Walk through the main rule or mechanism step-by-step.`,
      `Work through one example together while asking guiding questions.`,
      `Let your child solve a problem independently and celebrate their progress.`,
    ],
    common_mistakes: [
      `Memorizing steps or formulas without understanding the underlying concept.`,
      `Rushing through the question and missing key details or units.`,
      `Focusing only on the final answer rather than showing the working steps.`,
    ],
    kid_script: `Let's explore ${titleTopic} together! It might seem new at first, but once you see how it works, it's just like solving a fun puzzle. Let's tackle the first one together!`,
    problems: [
      {
        id: "p1",
        difficulty: "easy",
        question: `Basic concept question: In your own words, what is the main idea behind ${titleTopic}?`,
        hint: `Think about the very first example we talked about.`,
        answer: `The fundamental definition and core idea of ${titleTopic}.`,
        solution_steps: [
          `State the main concept clearly.`,
          `Check that it accurately reflects the lesson explanation.`,
        ],
      },
      {
        id: "p2",
        difficulty: "easy-medium",
        question: `First step practice: When approaching a problem about ${titleTopic}, what should you identify first?`,
        hint: `Look at the given information and what needs to be found.`,
        answer: `Identify what is given and what the question is asking for.`,
        solution_steps: [
          `Read the problem carefully.`,
          `List the known facts and the target answer.`,
        ],
      },
      {
        id: "p3",
        difficulty: "medium",
        question: `Standard Grade ${grade} application question on ${titleTopic}.`,
        hint: `Apply the step-by-step method from the lesson guide.`,
        answer: `Standard applied solution with step-by-step reasoning.`,
        solution_steps: [
          `Apply the primary rule.`,
          `Perform the calculation or logical deduction.`,
          `Double-check the result.`,
        ],
      },
      {
        id: "p4",
        difficulty: "medium-hard",
        question: `Spot the mistake: A student made a common error while solving a ${titleTopic} question. How would you help them correct it?`,
        hint: `Review the common mistakes section above.`,
        answer: `Point out where the reasoning went off track and show the correct step.`,
        solution_steps: [
          `Identify the misconception.`,
          `Explain why that step was incorrect.`,
          `Guide the student to the right method.`,
        ],
      },
      {
        id: "p5",
        difficulty: "challenge",
        question: `Challenge problem: Apply ${titleTopic} to solve a multi-step real-world problem.`,
        hint: `Break the problem into two smaller, manageable steps.`,
        answer: `Complete verified multi-step solution.`,
        solution_steps: [
          `Break down the challenge into smaller parts.`,
          `Solve each part sequentially.`,
          `Combine the results to reach the final answer.`,
        ],
      },
    ],
  };
}
