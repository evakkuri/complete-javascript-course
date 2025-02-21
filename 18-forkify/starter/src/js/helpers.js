import { TIMEOUT_SEC } from './config';

export const getJSON = async function (url) {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
