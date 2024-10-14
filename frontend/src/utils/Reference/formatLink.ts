export const formatLink = (link: string): string => {
  if (!link) {
    return '';
  }
  const trimmedLink = link.trim();

  if (trimmedLink.startsWith('http://') || trimmedLink.startsWith('https://')) {
    return trimmedLink;
  }

  return `https://${trimmedLink}`;
};
