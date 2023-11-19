import { redirect } from 'next/navigation';
import '../shared/globals.css'
import './home.css'
import { getServerSession } from 'next-auth/next';

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main className='main_home'>
      <section className='welcome_msg'>
        <h1>Welcome to <span className="gradient-font">Brickboard</span></h1>
      </section>
    </main>
  )
}
