import { getUserById } from '@/lib/actions/user.actions'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { userId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const userId = params.userId
 
  // fetch data
  const user = await getUserById(userId)
 
 
  return {
    title: `${user.name} (${user.username}) / Hash`,
  }
}

async function Profile({ params }: { params: { userId: string } }) {
  const user = await getUserById(params.userId)
  return (
    <pre>
        <code>
            {JSON.stringify(user, null, 2)}
        </code>
    </pre>
  )
}

export default Profile;
