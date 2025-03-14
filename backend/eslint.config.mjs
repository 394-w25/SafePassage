import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'README.md',
      'public/*',
    ],
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    lessOpinionated: true,
  },
)
