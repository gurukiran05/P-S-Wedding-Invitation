import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // Templates intentionally use plain <img> for CSS-driven layouts and external hosts
      '@next/next/no-img-element': 'off',
      // Invitation copy is full of typographic quotes/apostrophes; keep source text readable
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
