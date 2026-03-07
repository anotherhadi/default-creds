export function cleanUserInput(query: string | undefined | null): string {
  if (!query) return "";
  return query.replace(/[^a-zA-Z0-9\s.\-_/]/g, "").trim();
}

export function getRandomEmoji(): string {
  const emojis = [
    "(·.·)",
    "(>_<)",
    "¯\\_(ツ)_/¯",
    "(╯_╰)",
    "(-_-)",
    "┐(‘～`;)┌",
    "(X_X)",
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
