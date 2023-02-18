'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

type GuestBookEntryProps = {
  entry: {
    id: number;
    email: string;
    body: string;
    created_by: string;
    updated_at: string;
  };
  session: Session | null;
  locale: string;
};

export default function GuestbookEntry({
  entry,
  session,
  locale,
}: GuestBookEntryProps) {
  const router = useRouter();
  const deleteEntry = async () => {
    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    });

    router.refresh();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="prose w-full break-words dark:text-gray-200">
        {entry.body}
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {entry.created_by}
        </p>
        <span className=" text-gray-600 dark:text-[#c2c2c2]">/</span>
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {new Date(entry.updated_at).toLocaleDateString(
            locale === 'de' ? 'de-DE' : 'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }
          )}
        </p>
        {session?.user &&
          (entry.email === session.user.email || session.user.isAdmin) && (
            <>
              <span className="text-gray-600 dark:text-[#c2c2c2]">/</span>
              <button
                className="text-sm text-red-600 dark:text-red-400"
                onClick={deleteEntry}>
                Delete
              </button>
            </>
          )}
      </div>
    </div>
  );
}
