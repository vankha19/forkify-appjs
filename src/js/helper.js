const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    // const fetchPro = fetch(url);
    // const res = await Promise.race([fetchPro, timeout(10)]);
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // const fetchPro = fetch(url);
    // const res = await Promise.race([fetchPro, timeout(10)]);
    const res = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
// export const sendJSON = async function (url, uploadData) {
//   try {
//     // const fetchPro = fetch(url);
//     // const res = await Promise.race([fetchPro, timeout(10)]);
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
