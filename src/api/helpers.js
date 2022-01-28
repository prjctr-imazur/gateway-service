function discoverServiceName(path) {
  if (typeof path !== "string") return "";

  const [_, service] = path.split("/");

  return service ?? "";
}

module.exports = { discoverServiceName };
