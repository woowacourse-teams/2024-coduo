module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '**/*.config.js'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {},
      typescript: {
        directory: './src',
      },
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
  },
  rules: {
    // 함수 선언
    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression'],

    // 타입
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // 네이밍
    'id-length': ['error', { min: 2 }],
    'consistent-this': ['error', 'self'],

    // 상수
    'no-var': 'error',
    'prefer-const': 'error',
    'no-duplicate-imports': 'error',

    // 컴포넌트 네이밍
    'react/jsx-pascal-case': 'error',
    'react/react-in-jsx-scope': 'off',

    // 기타
    'import/no-named-as-default': 0,
    'import/no-unresolved': 'off',

    // import문 순서
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js 내장 모듈
          'external', // 외부 라이브러리
          'internal', // 내부 모듈
          ['parent', 'sibling', 'index'], // 상대 경로 모듈
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/types/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/styles/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};
