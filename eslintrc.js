module.exports = {
  // ... остальные настройки ...
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', {
      ignoreRestArgs: true,
      ignorePatterns: [
        'types/**/*.d.ts',
        '**/*.d.ts'
      ]
    }]
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
} 