import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Balancer from 'react-wrap-balancer';
import { allBlogs } from 'contentlayer/generated';
import { getLocale } from 'next-intl/server';

import ViewCounter from '@/components/blog/views-counter';
import { Mdx } from 'components/blog/mdx';

// export async function generateStaticParams() {
//   return allBlogs.map((post) => ({
//     locale: post.language,
//     slug: post.slug,
//   }));
// }

export default async function Blog({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto mb-16 flex w-full max-w-4xl flex-col items-start justify-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
        <div className="flex items-center">
          <Image
            alt="Alexander Konietzko"
            height={24}
            width={24}
            src="/static/images/konietzko_alexander.jpg"
            className="rounded-full"
          />
          <p className="ml-2 text-sm text-gray-700 dark:text-[#c2c2c2]">
            {'Alexander Konietzko / '}
            {new Date(post.publishedAt).toLocaleDateString(
              locale === 'de' ? 'de-DE' : 'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            )}
          </p>
        </div>
        <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-[#c2c2c2] md:mt-0">
          {post.readingTime}
          {` • `}
          <ViewCounter slug={post.slug} trackView={true} />
        </p>
      </div>
      <div className="mt-2 flex w-full text-xs">
        {post.tags.map((tag) => (
          <Link
            href={`/blog?filter=tag&search=${tag}`}
            key={tag}
            className="mx-2 rounded-xl border border-gray-600 px-2 py-1 hover:bg-gray-200 dark:border-gray-400 dark:hover:bg-gray-600">
            {tag}
          </Link>
        ))}
      </div>
      <div className="prose prose-neutral mt-4 w-full max-w-none dark:prose-invert">
        <Mdx code={post.body.code} />
      </div>
    </section>
  );
}
