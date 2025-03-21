import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'README.md',
      'public/*',
      'backend/*',
    ],
    react: true,
    typescript: {
      tsconfigPath: 'tsconfig.app.json',
    },
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    lessOpinionated: true,
  },
  {
    rules: {
      'ts/no-misused-promises': 'off',
    },
  },
)
