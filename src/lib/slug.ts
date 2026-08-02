export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function serviceSlug(entry: {
  data: { slug?: string; name: string };
}): string {
  return entry.data.slug ?? slugify(entry.data.name);
}
