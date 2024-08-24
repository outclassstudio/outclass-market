export function formatToTimeAgo(date: string): string {
  const dayInms = 1000 * 60 * 60 * 24;
  const hourInms = 1000 * 60 * 60;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = time - now;
  const formatter = new Intl.RelativeTimeFormat("ko");
  let trans;

  if (Math.abs(diff / dayInms) > 1) {
    trans = Math.round(diff / dayInms);
    return formatter.format(trans, "days");
  } else {
    if (Math.abs(diff / hourInms) < 1) {
      return "방금전";
    }
    trans = Math.round(diff / hourInms);
    return formatter.format(trans, "hours");
  }
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function convertToNumber(won: string): number {
  return Number(won.split(",").join(""));
}
