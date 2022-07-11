const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.results);

export default fetcher;
