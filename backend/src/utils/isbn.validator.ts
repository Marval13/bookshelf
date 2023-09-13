function isIsbnValid(isbn: string): boolean {
  if (isbn.length == 10) {
    return (
      isbn
        .split("")
        .map(
          (ch, i) => (ch.toUpperCase() == "X" ? 10 : parseInt(ch)) * (10 - i)
        )
        .reduce((sum, n) => sum + n, 0) %
        11 ===
      0
    );
  }

  if (isbn.length == 13) {
    return (
      isbn
        .split("")
        .map((ch, i) => parseInt(ch) * (i % 2 ? 1 : 3))
        .reduce((sum, n) => sum + n, 0) %
        10 ===
      0
    );
  }

  return false;
}

export default isIsbnValid
