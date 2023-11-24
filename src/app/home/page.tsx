import { redirect } from 'next/navigation';
import '../shared/globals.css'
import './home.css'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/api/auth/signin?callbackUrl=/home');
  }

  return (
    <main className='main_home'>
      <section className='welcome_msg'>
        <h1>Welcome to <span className="gradient-font">Brickboard</span>, {session.user.name ? session.user.name : 'Unknown User'}</h1>
      </section>
    </main>
  )
}
