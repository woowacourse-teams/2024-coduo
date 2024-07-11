module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "**/*.config.js"],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // 함수 선언
    "prefer-arrow-callback": "error",
    "func-style": ["error", "expression"],

    // 타입
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

    // 네이밍
    "id-length": ["error", { min: 2 }],
    "consistent-this": ["error", "self"],

    // 상수
    "no-var": "error",
    "prefer-const": "error",
    "no-duplicate-imports": "error",

    // 컴포넌트 네이밍
    "react/jsx-pascal-case": "error",
    "react/react-in-jsx-scope": "off",
  },
};
