declare module 'virtual:stl-starlight-virtual-module' {
  import type { DocsLanguage } from '@stainless-api/docs-ui/routing';

  export const EXCLUDE_LANGUAGES: DocsLanguage[];
}

declare module 'virtual:stainless-apis-manifest' {
  import type { DocsLanguage } from '@stainless-api/docs-ui/routing';

  export const api: {
    languages: {
      sdkJSONFilePath: string;
      language: DocsLanguage;
    }[];
  };
}
