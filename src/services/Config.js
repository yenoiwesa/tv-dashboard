const promise = fetch(new Request('/api/config')).then(response => response.json());

export default { promise };