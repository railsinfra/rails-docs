import * as React from 'react';
import type { StlStarlightMiddleware } from '@stainless-api/docs/plugin/MiddlewareTypes';
import { Dropdown } from '@stainless-api/docs/components';
import { LanguageNames, type DocsLanguage, getLanguageSnippet } from '@stainless-api/docs-ui/routing';
import { SDKIcon, type SDKRequestTitleProps } from '@stainless-api/docs-ui/components';
import { api } from 'virtual:stainless-apis-manifest';
import { EXCLUDE_LANGUAGES } from 'virtual:stl-starlight-virtual-module';

function getDocsLanguages(): DocsLanguage[] {
  return api.languages
    .map((entry) => entry.language)
    .filter((language) => !EXCLUDE_LANGUAGES.includes(language));
}

function SDKSelectReactComponent({
  selected,
  languages,
  className,
  ...rest
}: {
  selected: DocsLanguage;
  languages: DocsLanguage[];
  className?: string;
} & Omit<React.ComponentProps<'div'>, 'children'>) {
  return (
    <Dropdown data-current-value={selected} className={className} {...rest}>
      <Dropdown.Trigger>
        <Dropdown.TriggerSelectedItem>
          <Dropdown.Icon>
            <SDKIcon language={getLanguageSnippet(selected)} />
          </Dropdown.Icon>
          <span className="stl-snippet-dropdown-button-text">{LanguageNames[selected]}</span>
        </Dropdown.TriggerSelectedItem>
        <Dropdown.TriggerIcon>
          <span className="material-symbols-sharp" style={{ fontSize: 16 }} aria-hidden="true">
            unfold_more
          </span>
        </Dropdown.TriggerIcon>
      </Dropdown.Trigger>
      <Dropdown.Menu
        className="dropdown-menu stl-sdk-select-dropdown-menu"
        aria-labelledby="stl-docs-snippet-title-button"
      >
        {languages.map((item) => (
          <Dropdown.MenuItem key={item} value={item} isSelected={item === selected}>
            <Dropdown.Icon>
              <SDKIcon language={getLanguageSnippet(item)} size={16} />
            </Dropdown.Icon>
            <Dropdown.MenuItemText>{LanguageNames[item]}</Dropdown.MenuItemText>
            <Dropdown.MenuItemTemplate>
              <Dropdown.Icon>
                <SDKIcon language={getLanguageSnippet(item)} size={16} />
              </Dropdown.Icon>
              <span className="stl-snippet-dropdown-button-text">{LanguageNames[item]}</span>
            </Dropdown.MenuItemTemplate>
          </Dropdown.MenuItem>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

/** Snippet language dropdown without raw HTTP/cURL (`http`); map legacy `http.*` to TypeScript. */
function SDKRequestTitleNoHttp({ snippetLanguage }: SDKRequestTitleProps) {
  const raw = snippetLanguage.split('.').at(0) as DocsLanguage | undefined;
  const languages = getDocsLanguages().filter((l) => l !== 'http');
  const selected: DocsLanguage =
    raw === 'http' || !raw || !languages.includes(raw)
      ? (languages.includes('typescript') ? 'typescript' : languages[0]!)
      : raw;

  return (
    <SDKSelectReactComponent
      selected={selected}
      languages={languages}
      data-stldocs-snippet-select
      className="stl-sdk-select stl-ui-not-prose"
    />
  );
}

const middleware = {
  componentOverrides: {
    SDKRequestTitle: SDKRequestTitleNoHttp,
  },
} satisfies StlStarlightMiddleware;

export default middleware;
