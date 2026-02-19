
# Card Counting Trainer

Application to learn and practice card counting (Hi-Lo system) for Blackjack.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Adding Card Assets

The application expects card images in `public/cards/` following this naming convention:
`{rank}_of_{suit}.png`

Examples:
- `A_of_spades.png`
- `10_of_hearts.png`
- `K_of_diamonds.png`

If images are missing, a placeholder text will appear (or fallback image).

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: UI components and specific features (PracticeBoard)
- `src/lib`: Core logic (Deck, Counting, Storage)
- `src/hooks`: Custom React hooks (usePractice)
- `src/content`: Static content for learning sections

## Technologies

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Lucide React (Icons)
- Radix UI Primitives (via manual implementation or standard patterns)
