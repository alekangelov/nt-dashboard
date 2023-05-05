import { createMemo, createSignal, JSX } from 'solid-js';

interface TabProps {
  props: Record<string, string | boolean | undefined>;
  selected: boolean;
  id: string;
  handleSelect: () => void;
}

interface Tab {
  id: string;
}

interface PanelProps {
  id: string;
  props: Record<string, string | boolean>;
  selected: boolean;
}

export const createTabber = (tabs?: Tab[]) => {
  const [activeTab, setActiveTab] = createSignal(tabs?.at(0)?.id);
  return {
    Tabs: (
      props: {
        children: (props: TabProps) => JSX.Element;
      } & JSX.HTMLElementTags['div']
    ) => {
      return (
        <div {...props} role="tablist">
          {tabs?.map((tab) => {
            const selected = activeTab() === tab.id;
            const ariaProps = {
              role: 'tab',
              'aria-selected': selected.toString(),
              'aria-controls': `${tab.id}-panel`,
              id: `${tab.id}-tab`,
              'data-selected': selected ? 'true' : undefined,
            };
            return props.children({
              props: ariaProps,
              selected,
              handleSelect: () => setActiveTab(tab.id),
              id: tab.id,
            });
          })}
        </div>
      );
    },
    Panel: (
      props: {
        children: (props: PanelProps) => JSX.Element;
      } & JSX.HTMLElementTags['div']
    ) => {
      return (
        <div {...props}>
          {tabs?.map((tab) => {
            const selected = createMemo(() => activeTab() === tab.id);
            const ariaProps = {
              role: 'tabpanel',
              'aria-hidden': (!selected()).toString(),
              hidden: !selected(),
              id: `${tab.id}-panel`,
              'aria-labelledby': `${tab.id}-tab`,
            };

            return props.children({
              props: ariaProps,
              id: tab.id,
              selected: selected(),
            });
          })}
        </div>
      );
    },
  };
};
