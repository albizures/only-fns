export function downloadUri(name: string, uri: string) {
	const link = document.createElement('a');

	link.download = name;
	link.href = uri;
	link.style.display = 'none';

	document.body.append(link);

	link.click();

	link.remove();
}
