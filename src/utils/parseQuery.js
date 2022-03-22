const parseQuery = (query) => {
  if (!query || Object.keys(query).length === 0) {
    return {};
  }

  let parsed = {};

  query
    .match(/(?<={)(.*)(?=})/)[0]
    .split(';')
    .forEach((f) => {
      const splitted = f.split(':');

      parsed = { ...parsed, [splitted[0]]: splitted[1] };
    });

  return parsed;
};

export default parseQuery;
