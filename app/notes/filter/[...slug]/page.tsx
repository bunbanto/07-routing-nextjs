import { fetchNotes as fetchNotesApi } from '@/lib/api';
import NoteClient from './Notes.client';

interface Props {
  params: Promise<{ slug: string[] }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  const response = await fetchNotesApi({ page: 1, search: '', tag: category });

  return (
    <section>
      <NoteClient
        initialData={response}
        category={category}
        notes={response.notes}
        totalPages={response.totalPages}
      />
    </section>
  );
};

export default Page;
