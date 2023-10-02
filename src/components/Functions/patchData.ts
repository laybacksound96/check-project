let lastCallTimeout: any = null;

function patchData(time: number, callback: () => Promise<any>) {
  if (lastCallTimeout !== null) {
    clearTimeout(lastCallTimeout);
  }
  lastCallTimeout = setTimeout(async () => {
    await callback();
    lastCallTimeout = null;
  }, time);
}

export default patchData;
