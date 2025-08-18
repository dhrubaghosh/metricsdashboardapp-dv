export const parseThreshold = (str) => {
  if (!str) return null;

  if (str.includes("-")) {
    const [min] = str.split("-");
    const parsed = Number(min.replace(/\D/g, ""));
    console.log("Parsed threshold from range:", str, "→", parsed);
    return parsed;
  }
  const parsed = Number(str.replace(/\D/g, ""));
  console.log("Parsed threshold:", str, "→", parsed);
  return parsed;
};
