export const extractUrls = (htmlContent: string): string[] => {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  return htmlContent.match(urlRegex) || [];
};

export const shortenUrl = (url: string): string => {
  return `https://short.ly/${Math.random().toString(36).substr(2, 8)}`;
};

// export function shortenUrlsInHtml(htmlContent) {
//   // Use a regex to find URLs in href/src attributes
//   const urlRegex = /(?:href|src)=["'](https?:\/\/[^"']+)["']/gi;
//   const replacements = [];
//   let match;

//   // We'll mutate the HTML string as we go
//   let updatedHtml = htmlContent;

//   while ((match = urlRegex.exec(htmlContent)) !== null) {
//     const originalUrl = match[1];
//     const id = generateId();
//     const newUrl = `https://tinyurl.brighamandersen.com/${id}`;

//     replacements.push({ id, originalUrl, newUrl });

//     // Replace only this specific URL instance (not all globally)
//     updatedHtml = updatedHtml.replace(originalUrl, newUrl);
//   }

//   return { updatedHtml, urls: replacements };
// }
