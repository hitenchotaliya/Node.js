

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function asyncajaxawait()
{
  const res = await fetch('https://www.google.com/')
  console.log(res);
}

asyncajaxawait();

