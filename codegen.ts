import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/tasks/typeDefs.graphql',
  generates: {
    'src/__generated__/tasks.ts': {
      config: {
        scalars: {
          Date: 'Date',
        },
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
