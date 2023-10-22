import { queryBuilder } from '@/lib/db';
import { allBlogs } from 'contentlayer/generated';

export const runtime = 'edge';

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  if (!params.slug) {
    return new Response(JSON.stringify({ error: 'No slug provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const data = await queryBuilder
    .selectFrom('views')
    .where('slug', '=', params.slug)
    .select(['count'])
    .execute();

  const views = !data.length ? 0 : Number(data[0]?.count);

  await queryBuilder
    .insertInto('views')
    .values({ slug: params.slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute();

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
