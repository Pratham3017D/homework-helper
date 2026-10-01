# Homework Helper — UI/UX Specification

## Design Direction

Warm, reassuring, calm, and focused.

The interface should feel like a helpful tutor sitting beside the parent—not like a developer tool.

## 1. Landing Page

Elements:
- Product name.
- Promise: "Understand the topic in 2 minutes. Help your child in 10."
- Topic input.
- Grade selector.
- Subject selector.
- Optional curriculum selector.
- Generate button.
- Example topics.

Example empty-state topics:
- Fractions
- Long division
- Photosynthesis
- Nouns and verbs

## 2. Loading State

Show:
- Clear progress message.
- Skeleton cards.
- No misleading fake progress percentage.

Example:
"Building a parent-friendly explanation…"

If generation takes longer:
"Still working on the practice questions…"

## 3. Learning Result

Order:

1. Topic title.
2. Parent summary.
3. Why it works.
4. How to explain it.
5. Common mistakes.
6. Practice set.
7. Print worksheet.

The parent summary should be visible without excessive scrolling.

## 4. Parent Briefing Card

Sections:
- What it is.
- Why it works.
- Steps.
- Common mistakes.

Use visual hierarchy, not giant paragraphs.

## 5. Teaching Script

Visually distinguish the script as something the parent can say.

Example label:

"Try saying this to your child"

Do not make it sound mandatory or robotic.

## 6. Practice Card

Each card initially shows:
- Difficulty.
- Question.
- Show hint button.
- Reveal answer button.

After hint:
- Show hint.

After answer:
- Show answer and solution steps.

The answer should not be visible by default.

## 7. Error State

Examples:
- "We couldn't generate this right now."
- "Try again."
- "Try a shorter topic or question."

Never expose stack traces or provider errors.

## 8. Print View

When printing:
- Hide navigation.
- Hide interactive controls.
- Show questions and optional answer key depending on print mode.
- Use readable spacing.
- Avoid splitting a single question across pages when possible.

## 9. Responsive Behavior

Mobile:
- single column;
- sticky/obvious Generate or Practice navigation only where useful;
- minimum comfortable touch targets;
- no dense tables.

Desktop:
- centered content column;
- optional two-column layout for parent briefing/practice where it improves scanning.

## 10. Accessibility

- Semantic headings.
- Form labels.
- Keyboard navigation.
- Focus indicators.
- Accessible button names.
- Reduced-motion support.
- Proper error announcements.
- Avoid color-only status communication.

## 11. Future Parent-Child Mode

Parent mode can contain notes hidden from the child.

Child mode should:
- simplify language;
- provide interactive answer entry;
- keep solutions hidden;
- avoid displaying parent-specific notes.
