export const delay = (seconds: number): Promise<number> =>
  new Promise((resolve) => {
    const id = (setTimeout((): void => {
      resolve(id);
    }, seconds * 1000) as unknown) as number;
  });

export function generateId(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
}
