const getJSON = function (url, errMsg = "Ooops, something went wrong! ") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(errMsg);
    return response.json();
  });
};

const getCapitalOf = async function (c1, c2, c3) {
  try {
    // const [country1Data] = await getJSON(
    //   `https://restcountries.com/v2/name/${c1}`
    // );

    // const [country2Data] = await getJSON(
    //   `https://restcountries.com/v2/name/${c2}`
    // );

    // const [country3Data] = await getJSON(
    //   `https://restcountries.com/v2/name/${c3}`
    // );

    // console.log([
    //   country1Data.capital,
    //   country2Data.capital,
    //   country3Data.capital,
    // ]);

    // parallel access
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map((country) => console.log(country[0].capital)));
  } catch (error) {
    console.error(error);
  }
};

getCapitalOf("nepal", "australia", "japan");
