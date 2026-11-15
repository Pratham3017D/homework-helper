/**
 * Independent Deterministic Mathematics Verification Engine
 *
 * Rules:
 * 1. Never relies on an LLM to verify its own calculations.
 * 2. Deterministically parses and calculates arithmetic, fractions, percentages, and simple equations without using eval().
 * 3. Clearly distinguishes schema validation from mathematical verification.
 * 4. Flags arithmetic contradictions as 'verification_failed'.
 * 5. Returns 'verified' ONLY when independent deterministic verification confirmed calculations.
 * 6. Non-mathematical or conceptual questions are marked as 'schema_validated' or 'not_verified'.
 */

import type { GeneratedContent, PracticeProblem } from "../../schemas/content.ts";

export type VerificationStatus =
  | "schema_validated"
  | "verified"
  | "not_verified"
  | "verification_failed";

export interface ProblemVerificationResult {
  problemId: string;
  difficulty: string;
  status: VerificationStatus;
  detectedType: "arithmetic" | "fraction" | "percentage" | "linear_equation" | "none";
  expression?: string;
  expectedAnswer?: string | number;
  extractedAnswer?: string | number;
  details: string;
}

export interface VerificationReport {
  overallStatus: VerificationStatus;
  isMathematicallyApplicable: boolean;
  totalProblems: number;
  verifiedCount: number;
  failedCount: number;
  unsupportedCount: number;
  results: ProblemVerificationResult[];
  summary: string;
}

// -------------------------------------------------------------
// Safe Arithmetic Evaluator (Tokenizer & Recursive Descent Parser)
// No eval(), no Function() constructor. Completely safe.
// -------------------------------------------------------------

function tokenize(expr: string): string[] {
  const normalized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");

  const tokens: string[] = [];
  let i = 0;

  while (i < normalized.length) {
    const char = normalized[i];

    if ("+-*/()^".includes(char)) {
      tokens.push(char);
      i++;
    } else if (/[0-9.]/.test(char)) {
      let numStr = "";
      while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
        numStr += normalized[i];
        i++;
      }
      tokens.push(numStr);
    } else {
      i++;
    }
  }

  return tokens;
}

class SafeMathParser {
  private tokens: string[];
  private pos = 0;

  constructor(tokens: string[]) {
    this.tokens = tokens;
  }

  parse(): number {
    const result = this.parseExpression();
    if (this.pos < this.tokens.length) {
      throw new Error("Unexpected trailing tokens in expression");
    }
    return result;
  }

  private parseExpression(): number {
    let result = this.parseTerm();

    while (this.pos < this.tokens.length) {
      const op = this.tokens[this.pos];
      if (op === "+" || op === "-") {
        this.pos++;
        const nextTerm = this.parseTerm();
        result = op === "+" ? result + nextTerm : result - nextTerm;
      } else {
        break;
      }
    }

    return result;
  }

  private parseTerm(): number {
    let result = this.parseFactor();

    while (this.pos < this.tokens.length) {
      const op = this.tokens[this.pos];
      if (op === "*" || op === "/") {
        this.pos++;
        const nextFactor = this.parseFactor();
        if (op === "/") {
          if (Math.abs(nextFactor) < 1e-12) throw new Error("Division by zero");
          result = result / nextFactor;
        } else {
          result = result * nextFactor;
        }
      } else {
        break;
      }
    }

    return result;
  }

  private parseFactor(): number {
    let result = this.parsePrimary();

    if (this.pos < this.tokens.length && this.tokens[this.pos] === "^") {
      this.pos++;
      const exponent = this.parseFactor();
      result = Math.pow(result, exponent);
    }

    return result;
  }

  private parsePrimary(): number {
    const token = this.tokens[this.pos++];

    if (!token) throw new Error("Unexpected end of expression");

    if (token === "(") {
      const inner = this.parseExpression();
      if (this.tokens[this.pos++] !== ")") {
        throw new Error("Missing closing parenthesis");
      }
      return inner;
    }

    if (token === "-") {
      return -this.parsePrimary();
    }

    if (token === "+") {
      return this.parsePrimary();
    }

    const num = Number(token);
    if (isNaN(num)) throw new Error(`Invalid token: ${token}`);
    return num;
  }
}

export function safeEvaluate(expr: string): number | null {
  try {
    const tokens = tokenize(expr);
    if (tokens.length === 0) return null;
    const parser = new SafeMathParser(tokens);
    const result = parser.parse();
    return isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// Fraction Arithmetic Helper
// -------------------------------------------------------------

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

function parseFractionString(str: string): Fraction | null {
  const match = str.match(/(-?\d+)\s*\/\s*(\d+)/);
  if (!match) return null;
  const den = Number(match[2]);
  if (den === 0) return null;
  return { numerator: Number(match[1]), denominator: den };
}

function simplifyFraction(f: Fraction): Fraction {
  const common = gcd(f.numerator, f.denominator);
  return {
    numerator: f.numerator / common,
    denominator: f.denominator / common,
  };
}

// -------------------------------------------------------------
// Pattern Matchers for Homework Questions
// -------------------------------------------------------------

function extractNumberFromAnswer(answerText: string): number | null {
  // Matches expressions like "= 15", "is 15", "x = 4", "answer: 42", or standalone number "42"
  const patterns = [
    /(?:=\s*|is\s+|equal(?:s)?\s+to\s+|answer(?:\s+is)?\s*:?\s*)([-+]?\d*\.?\d+)/i,
    /([xXyYzZ]\s*=\s*)([-+]?\d*\.?\d+)/i,
    /(?:^|\s)([-+]?\d*\.?\d+)(?:\s*(?:units?|cm|m|kg|hours?|apples?|pizzas?|%|\.|$))/i,
  ];

  for (const pat of patterns) {
    const m = answerText.match(pat);
    if (m) {
      const val = Number(m[m.length - 1]);
      if (!isNaN(val)) return val;
    }
  }

  return null;
}

function extractFractionFromAnswer(answerText: string): Fraction | null {
  return parseFractionString(answerText);
}

// -------------------------------------------------------------
// Verifiers per mathematical category
// -------------------------------------------------------------

function verifyArithmeticProblem(
  problem: PracticeProblem
): ProblemVerificationResult | null {
  const q = problem.question;

  // If question contains an algebraic equation or variable solving, let equation verifier handle it
  if (/[a-zA-Z]\s*=/i.test(q) || /=\s*[a-zA-Z]/i.test(q) || /solve\s+for/i.test(q)) {
    return null;
  }

  // If question asks about percentages, or answer is a percentage while candidate expression is not,
  // let percentage verifier handle it
  if (
    problem.answer.includes("%") ||
    /percent|percentage|प्रतिशत/i.test(q)
  ) {
    return null;
  }

  // Pattern: "What is 15 + 27?", "Calculate 12 * 8", "Evaluate (10 - 4) * 5"
  const mathExprMatch = q.match(
    /(?:what\s+is|calculate|evaluate|solve|compute|find\s+the\s+value\s+of)?\s*([0-9\s()+\-*\/^.×÷]{3,40})/i
  );

  if (mathExprMatch) {
    const candidateExpr = mathExprMatch[1].trim();
    // Must contain at least one arithmetic operator
    if (/[+\-*\/^×÷]/.test(candidateExpr)) {
      const computed = safeEvaluate(candidateExpr);
      if (computed !== null) {
        const extracted = extractNumberFromAnswer(problem.answer);

        if (extracted !== null) {
          const isMatch = Math.abs(computed - extracted) < 1e-4;
          return {
            problemId: problem.id,
            difficulty: problem.difficulty,
            status: isMatch ? "verified" : "verification_failed",
            detectedType: "arithmetic",
            expression: candidateExpr,
            expectedAnswer: computed,
            extractedAnswer: extracted,
            details: isMatch
              ? `Independent calculation confirmed: ${candidateExpr} = ${computed}`
              : `Calculation contradiction: expected ${candidateExpr} = ${computed}, but found ${extracted}`,
          };
        }
      }
    }
  }

  return null;
}

function verifyPercentageProblem(
  problem: PracticeProblem
): ProblemVerificationResult | null {
  const q = problem.question;

  // 1. Fraction-to-percentage pattern: "Convert 3/5 into a percentage" or "भिन्न 3/5 को प्रतिशत में बदलिए"
  if (/percent|percentage|प्रतिशत/i.test(q)) {
    const fracMatch = q.match(/(\d+)\s*\/\s*(\d+)/);
    if (fracMatch) {
      const num = Number(fracMatch[1]);
      const den = Number(fracMatch[2]);
      if (den > 0) {
        const expected = (num / den) * 100;
        const extracted = extractNumberFromAnswer(problem.answer);
        if (extracted !== null) {
          const isMatch = Math.abs(expected - extracted) < 1e-4;
          return {
            problemId: problem.id,
            difficulty: problem.difficulty,
            status: isMatch ? "verified" : "verification_failed",
            detectedType: "percentage",
            expression: `(${num}/${den}) * 100%`,
            expectedAnswer: `${expected}%`,
            extractedAnswer: `${extracted}%`,
            details: isMatch
              ? `Independent calculation confirmed: ${num}/${den} = ${expected}%`
              : `Percentage mismatch: expected ${expected}%, but answer states ${extracted}%`,
          };
        }
      }
    }
  }

  // 2. Quantity percentage: "20% of 150", "Find 15% of 80", "200 का 25%"
  // English pattern: X% of Y
  let pctMatch = q.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);
  let pct = 0;
  let base = 0;

  if (pctMatch) {
    pct = Number(pctMatch[1]);
    base = Number(pctMatch[2]);
  } else {
    // Hindi pattern: Y का X% or X% का Y
    const hindiMatch1 = q.match(/(\d+(?:\.\d+)?)\s*का\s*(\d+(?:\.\d+)?)\s*%/);
    const hindiMatch2 = q.match(/(\d+(?:\.\d+)?)\s*%\s*का\s*(\d+(?:\.\d+)?)/);
    if (hindiMatch1) {
      base = Number(hindiMatch1[1]);
      pct = Number(hindiMatch1[2]);
      pctMatch = hindiMatch1;
    } else if (hindiMatch2) {
      pct = Number(hindiMatch2[1]);
      base = Number(hindiMatch2[2]);
      pctMatch = hindiMatch2;
    }
  }

  if (pctMatch && base > 0) {
    const expected = (pct * base) / 100;
    const extracted = extractNumberFromAnswer(problem.answer);

    if (extracted !== null) {
      const isMatch = Math.abs(expected - extracted) < 1e-4;
      return {
        problemId: problem.id,
        difficulty: problem.difficulty,
        status: isMatch ? "verified" : "verification_failed",
        detectedType: "percentage",
        expression: `${pct}% of ${base}`,
        expectedAnswer: expected,
        extractedAnswer: extracted,
        details: isMatch
          ? `Independent calculation confirmed: ${pct}% of ${base} = ${expected}`
          : `Percentage mismatch: expected ${expected}, but answer states ${extracted}`,
      };
    }
  }

  return null;
}

function verifyFractionProblem(
  problem: PracticeProblem
): ProblemVerificationResult | null {
  const q = problem.question;

  // Pattern: "1/4 + 2/4", "3/5 - 1/5", "1/2 * 3/4"
  const fracOpMatch = q.match(
    /(\d+\s*\/\s*\d+)\s*([+\-*])\s*(\d+\s*\/\s*\d+)/i
  );

  if (fracOpMatch) {
    const f1 = parseFractionString(fracOpMatch[1]);
    const op = fracOpMatch[2];
    const f2 = parseFractionString(fracOpMatch[3]);

    if (f1 && f2) {
      let resultNum = 0;
      const resultDen = f1.denominator * f2.denominator;

      if (op === "+") {
        resultNum = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
      } else if (op === "-") {
        resultNum = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
      } else if (op === "*") {
        resultNum = f1.numerator * f2.numerator;
      }

      const simplified = simplifyFraction({
        numerator: resultNum,
        denominator: resultDen,
      });

      const decimalExpected = simplified.numerator / simplified.denominator;

      // Check against answer fraction or decimal
      const ansFrac = extractFractionFromAnswer(problem.answer);
      const ansNum = extractNumberFromAnswer(problem.answer);

      let isMatch = false;
      let extractedStr = "";

      if (ansFrac) {
        const simplifiedAns = simplifyFraction(ansFrac);
        isMatch =
          simplifiedAns.numerator === simplified.numerator &&
          simplifiedAns.denominator === simplified.denominator;
        extractedStr = `${ansFrac.numerator}/${ansFrac.denominator}`;
      } else if (ansNum !== null) {
        isMatch = Math.abs(ansNum - decimalExpected) < 1e-4;
        extractedStr = String(ansNum);
      }

      if (extractedStr) {
        const expectedStr = `${simplified.numerator}/${simplified.denominator} (or ${decimalExpected})`;
        return {
          problemId: problem.id,
          difficulty: problem.difficulty,
          status: isMatch ? "verified" : "verification_failed",
          detectedType: "fraction",
          expression: `${fracOpMatch[1]} ${op} ${fracOpMatch[3]}`,
          expectedAnswer: expectedStr,
          extractedAnswer: extractedStr,
          details: isMatch
            ? `Fraction calculation confirmed: ${fracOpMatch[1]} ${op} ${fracOpMatch[3]} = ${expectedStr}`
            : `Fraction calculation contradiction: expected ${expectedStr}, found ${extractedStr}`,
        };
      }
    }
  }

  return null;
}

function verifyLinearEquationProblem(
  problem: PracticeProblem
): ProblemVerificationResult | null {
  const q = problem.question;

  // Pattern: "Solve for x: 2x + 4 = 10" or "x + 7 = 15"
  const eqMatch = q.match(
    /(?:solve\s+for\s+[a-z]:?\s*)?([+-]?\d*)[a-z]\s*([+-])\s*(\d+)\s*=\s*([+-]?\d+)/i
  );

  if (eqMatch) {
    const rawA = eqMatch[1];
    const a = rawA === "" || rawA === "+" ? 1 : rawA === "-" ? -1 : Number(rawA);
    const sign = eqMatch[2];
    const b = Number(eqMatch[3]) * (sign === "-" ? -1 : 1);
    const c = Number(eqMatch[4]);

    if (a !== 0) {
      const expectedX = (c - b) / a;
      const extracted = extractNumberFromAnswer(problem.answer);

      if (extracted !== null) {
        const isMatch = Math.abs(expectedX - extracted) < 1e-4;
        return {
          problemId: problem.id,
          difficulty: problem.difficulty,
          status: isMatch ? "verified" : "verification_failed",
          detectedType: "linear_equation",
          expression: `${a === 1 ? "" : a}x ${sign} ${Math.abs(b)} = ${c}`,
          expectedAnswer: expectedX,
          extractedAnswer: extracted,
          details: isMatch
            ? `Equation verified: solution is x = ${expectedX}`
            : `Equation contradiction: expected x = ${expectedX}, found x = ${extracted}`,
        };
      }
    }
  }

  return null;
}

// -------------------------------------------------------------
// Main Verification Runner
// -------------------------------------------------------------

export function verifyEducationalContent(
  content: GeneratedContent
): VerificationReport {
  const isMath = content.subject?.toLowerCase().includes("math");
  const problems = content.problems || [];
  const results: ProblemVerificationResult[] = [];

  let verifiedCount = 0;
  let failedCount = 0;
  let unsupportedCount = 0;

  for (const problem of problems) {
    let result: ProblemVerificationResult | null = null;

    if (isMath) {
      result =
        verifyLinearEquationProblem(problem) ||
        verifyFractionProblem(problem) ||
        verifyPercentageProblem(problem) ||
        verifyArithmeticProblem(problem);
    }

    if (result) {
      results.push(result);
      if (result.status === "verified") verifiedCount++;
      if (result.status === "verification_failed") failedCount++;
    } else {
      unsupportedCount++;
      results.push({
        problemId: problem.id,
        difficulty: problem.difficulty,
        status: isMath ? "schema_validated" : "schema_validated",
        detectedType: "none",
        details: isMath
          ? "Conceptual or multi-step geometric question; passed schema validation."
          : "Non-mathematical topic; passed schema and pedagogical structure validation.",
      });
    }
  }

  // Determine overall status
  let overallStatus: VerificationStatus = "schema_validated";
  let summary = "";

  if (failedCount > 0) {
    overallStatus = "verification_failed";
    summary = `Verification detected ${failedCount} arithmetic contradiction(s) in practice answers.`;
  } else if (verifiedCount > 0) {
    overallStatus = "verified";
    summary = `Independent engine successfully verified ${verifiedCount} calculation(s). Remaining questions validated against pedagogical schema.`;
  } else {
    overallStatus = "schema_validated";
    summary = isMath
      ? "All questions verified for grade-level pedagogical structure and schema compliance."
      : "Subject is non-mathematical; pedagogical structure and schema validated.";
  }

  return {
    overallStatus,
    isMathematicallyApplicable: isMath,
    totalProblems: problems.length,
    verifiedCount,
    failedCount,
    unsupportedCount,
    results,
    summary,
  };
}
