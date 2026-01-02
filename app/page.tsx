import { ModeToggle } from '@/components/theme/mode-toggle'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold'>Welcome to Coin Pulse</h1>
      <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
        Your crypto screener app with a built-in high-frequency terminal &amp;
        dashboard.
      </p>
      <p className='text-3xl text-indigo-500'>Coin Pulse</p>
      <div>
        <ModeToggle />
      </div>
    </main>
  )
}
