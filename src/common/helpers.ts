export async function sleep(ms: number): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}
