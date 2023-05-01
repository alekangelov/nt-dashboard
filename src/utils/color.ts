export const colorVariables = {
  surface: 'color-surface',
  onSurface: 'color-on-surface',
};

export const getColorVariable = (
  val: keyof typeof colorVariables,
  alpha = 1
) => {
  return `rgba(var(${colorVariables[val]}), ${alpha})`;
};

export const getVariableName = (value: string) => {
  return value.replace('var(', '').replace(')', '');
};
