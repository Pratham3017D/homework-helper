# Homework Helper for Parents — Product Requirements Document

## 1. Product Overview

**Working name:** Homework Helper  
**Primary promise:** Understand the topic in 2 minutes. Help your child in 10.

Homework Helper is a mobile-first web application that helps parents of children in approximately Grades 1–8 understand a homework topic and explain it to their child.

The product is intentionally parent-first. It should not simply return an answer to a homework question. It should provide:
1. A concise parent briefing.
2. The intuition behind the concept.
3. A simple teaching script.
4. Common mistakes to watch for.
5. Five progressively difficult practice problems.
6. Hints and step-by-step solutions.

## 2. Problem

Parents often want to help with homework but:
- do not remember the topic;
- learned a different method years ago;
- find textbook explanations too child-focused;
- cannot spend 30 minutes searching videos;
- may not know whether an AI-generated explanation is correct;
- need something usable on a phone while helping a child.

The product turns a vague request such as "How do I explain long division?" into a structured teaching session.

## 3. Target Users

### Primary user
Parents/guardians of children in Grades 1–8.

### Secondary users
- Tutors
- Older siblings
- Homeschooling adults
- Teachers using the tool as a supplementary aid

## 4. Product Principles

- Parent first, child second.
- Teach rather than merely answer.
- Hints before answers.
- Short, calm, jargon-light explanations.
- AI output must be validated before display.
- Mathematical content should be independently verified where practical.
- Collect the minimum personal information necessary.
- Mobile-first.
- MVP before advanced features.

## 5. MVP Scope

### P0 — Required

#### Topic input
- Free-text topic/question.
- Example topics shown on empty state.
- Grade selector: Grades 1–8.
- Subject selector: Mathematics, Science, English/Language, Other.
- Optional curriculum/board field.

#### Parent briefing
Return:
- What it is, in one sentence.
- Why it works / intuition.
- How the method works.
- Common mistakes.
- A short "how schools may teach it" note when relevant.

#### Teaching script
A short script the parent can adapt and say to the child.

#### Practice
Generate exactly 5 practice items when the content engine can safely do so:
- Easy
- Easy/Medium
- Medium
- Medium/Hard
- Challenge

Each item supports:
- Show hint.
- Reveal answer.
- Step-by-step solution.

#### Validation
- Zod validates the complete AI response.
- Mathematical practice content gets independent verification for supported math types.
- Invalid AI output is not rendered as trusted content.

#### UX
- Mobile-first.
- Large touch targets.
- Clear progress through sections.
- Loading/error/empty states.
- Print-friendly worksheet.

### P1 — Version 2

- Textbook/homework photo input.
- Parent-child mode.
- Multilingual explanations.
- "My child is stuck here" follow-up.
- Saved history.
- Optional accounts and saved sessions.

### P2 — Later

- Child profiles.
- Topic progress tracking.
- Weekly review.
- Teacher-shared links.
- More advanced curriculum alignment.
- Expanded subject-specific validators.
- Analytics and personalized recommendations.

## 6. Explicitly Out of MVP

- Social/community features.
- Public child profiles.
- Complex gamification.
- Native mobile apps.
- Full learning-management-system functionality.
- Automatic grading of arbitrary handwritten work.
- Medical/legal/high-stakes educational claims.
- Large-scale curriculum guarantees.
- Fine-grained child tracking.

## 7. Core User Flow

```text
Landing
  ↓
Enter topic/question
  ↓
Select grade + subject
  ↓
Generate
  ↓
Parent briefing
  ↓
Teaching script
  ↓
Common mistakes
  ↓
Practice set
  ↓
Hint → Answer → Solution
  ↓
Print worksheet / Start another topic
```

## 8. User Stories

### Parent
- As a parent, I want to enter a topic so I can quickly understand it.
- As a parent, I want an explanation written for an adult so I can explain it confidently.
- As a parent, I want a script so I know what to say to my child.
- As a parent, I want common mistakes so I can identify where my child is confused.
- As a parent, I want practice problems so my child can apply the concept.
- As a parent, I want hints before answers so the child still has a chance to think.
- As a parent, I want to print the practice set.

## 9. Acceptance Criteria

### Generation
- User cannot submit without a topic and grade.
- API rejects malformed input.
- AI output must pass schema validation.
- Invalid output triggers a controlled error/retry path.
- No server-side API key is exposed to the browser.

### Practice
- MVP attempts to produce 5 items.
- Each item has question, hint, answer, and solution steps.
- Supported math problems are independently verified.
- Unverified content is clearly handled by the backend and is not falsely labeled as verified.

### UX
- Works on mobile and desktop.
- All interactive controls are keyboard accessible.
- Loading state appears immediately after generation starts.
- Errors provide a retry path.
- Print view hides navigation and unnecessary UI.

## 10. Success Metrics for Portfolio Validation

Initial project success is not defined by production scale. Measure:
- Time from opening app to useful explanation.
- Generation success rate.
- Schema-validation failure rate.
- Mathematical verification failure rate.
- Percentage of testers who can explain the concept after reading the briefing.
- Parent tester feedback from 3–5 real users.

## 11. Risks

| Risk | Mitigation |
|---|---|
| AI hallucination | Structured output + validation + targeted verification |
| Wrong math | Programmatic verification for supported problem types |
| Too advanced language | Grade-aware prompts and manual test set |
| High API cost | Caching + limits + concise prompts |
| Scope creep | Strict MVP boundary |
| Privacy concerns | Minimal data collection |
| Poor mobile UX | Mobile-first design and real-device testing |

## 12. Portfolio Case Study

The final case study should show:
1. Problem.
2. User research with 3–5 parents.
3. Product decisions.
4. Architecture.
5. AI reliability strategy.
6. Math verification.
7. Screenshots/demo.
8. Testing results.
9. What changed after user feedback.
10. Future improvements.
