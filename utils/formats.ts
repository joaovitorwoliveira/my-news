export function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`;
  } else if (diffInHours < 24) {
    return `Há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
  } else if (diffInDays === 1) {
    return "Ontem";
  } else {
    return `Há ${diffInDays} dias`;
  }
}
