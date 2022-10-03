const postFields = `
  _id,
  title,
  date,
  excerpt,
  language,
  translation,
  "tags": tags,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)] {"slug": slug.current, language}
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const postUpdatedQuery = `*[_type == "post" && _id == $id][0] {"slug": slug.current, language}`;

export const postAmountQuery = `count(*[_type == 'post' && language == $language])`;
