import { Component, createMemo, For } from 'solid-js';
import { useAssets } from 'solid-js/web';
import { StyleRegistry, css, renderSheets } from 'solid-styled';
import { Dock } from '@components/Dock';
import { Clock } from '@components/Clock';
import { GDock } from '@components/GDock';
import { App as Xapp, useWindows } from './store';
import { Window } from '@components/Window';
const GlobalStyles = () => {
  css`
    @global {
      body {
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        background-image: url(https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80);
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      :root {
        --color-surface: 254, 254, 254;
        --color-on-surface: 0, 0, 0;
      }
      * {
        box-sizing: border-box;
      }
    }
  `;
  return null;
};
const App: Component = () => {
  const sheets: any[] = [];
  useAssets(() => renderSheets(sheets));
  css`
    main {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      margin: 0;
      left: 0;
    }
  `;
  const { windows } = useWindows;
  const apps = createMemo(() => {
    console.log(windows);
    return Object.entries(windows);
  });
  return (
    <main>
      <StyleRegistry styles={sheets}>
        <GlobalStyles />
        <Dock />
        <Clock />
        <GDock />

        <For each={apps()}>
          {([app, props]) => (
            <Window
              state={props?.state}
              type={app as Xapp}
              rect={props?.rect}
            />
          )}
        </For>
      </StyleRegistry>
    </main>
  );
};

export default App;
