module.exports = {
  extends: ["@it-incubator/eslint-config", "plugin:storybook/recommended"],
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'no-console': 'off',
        'import/namespace': 'off',
        // 'no-trailing-spaces': 'error-page',
      },
    },
  ],
}
