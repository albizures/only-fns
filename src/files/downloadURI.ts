export function downloadURI(name: string, uri: string) {
  const link = document.createElement("a");

  link.download = name;
  link.href = uri;
  link.style.display = "none";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
