import CoinOverview from '@/components/home/CoinOverview'
import TrendingCoins from '@/components/home/TrendingCoins'
// import { fetcher } from '@/lib/coingecko.actions'
// import { formatCurrency } from '@/lib/utils'
// import Image from 'next/image'
import { Suspense } from 'react'

export default async function Home() {
  // const coin = await fetcher<CoinDetailsData>('coins/bitcoin', {
  //   dex_pair_format: 'symbol',
  // })
  // const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
  //   'search/trending',
  //   undefined,
  //   600,
  // )

  // console.log('coin', coin)
  return (
    <main className='main-container'>
      {/* <main className='main-container inner flex flex-col items-center justify-center'> */}
      <section className='home-grid'>
        <Suspense fallback={<div>Loading coin overview...</div>}>
          <CoinOverview />
        </Suspense>

        {/* <div id='coin-overview'>
          <div className='header pt-2'>
            <Image
              src={coin.image.small}
              alt={coin.name}
              width={56}
              height={56}
            />
            <div className='info'>
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </div> */}

        <Suspense fallback={<div>Loading trending coins...</div>}>
          <TrendingCoins />
        </Suspense>
      </section>
    </main>
  )
}
