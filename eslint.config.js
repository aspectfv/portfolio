import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Destructuring a key away to omit it is the only way to drop an optional
      // property under exactOptionalPropertyTypes. The discarded binding is the
      // point, so allow it when it is underscore-prefixed.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
  {
    // Three.js and React Three Fiber are confined to src/scene/ so the 3D bundle stays
    // a separate lazy chunk and the no-WebGL fallback stays honest.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/scene/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'three', message: 'Three.js may only be imported inside src/scene/.' },
            {
              name: '@react-three/fiber',
              message: 'React Three Fiber may only be imported inside src/scene/.',
            },
            {
              name: '@react-three/drei',
              message: 'drei may only be imported inside src/scene/.',
            },
          ],
          patterns: ['three/*', '@react-three/*'],
        },
      ],
    },
  },
  prettier,
)
