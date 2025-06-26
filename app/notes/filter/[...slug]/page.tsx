import { fetchNotes } from '@/lib/api';
import NoteClient from './Notes.client';

type Props = {
  params: { slug: string[] };
};

const Notes = async ({ params }: Props) => {
  const { slug } = params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  const response = await fetchNotes({ page: 1, search: '', tag: category });

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

export default Notes;
