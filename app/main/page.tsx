import DataTable from '@/components/data-table'
// import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'

// const columns: DataTableColumn<TrendingCoin>[] = [
//   {
//     header: 'Name',
//     cellClassName: 'name-cell',
//     cell: (coin) => {
//       const item = coin.item
//       return (
//         <Link href={`/coins/${item.id}`} className='flex items-center gap-2'>
//           <Image
//             src={item.large}
//             alt={item.name}
//             width={36}
//             height={36}
//             className='name-image'
//           />
//           <p className='name-line'>{item.name}</p>
//         </Link>
//       )
//     },
//   },
//   {
//     header: '24h Change',
//     cellClassName: 'name-cell',
//     cell: (coin) => {
//       const priceChange = coin.item.data.price_change_percentage_24h.usd
//       const isTrendingUp = coin.item.data.price_change_percentage_24h.usd > 0
//       const isPositive = priceChange >= 0
//       return (
//         <div
//           className={cn(
//             'price-change',
//             isTrendingUp ? 'text-green-500' : 'text-red-500'
//           )}
//         >
//           <p>
//             {/* {item.name} is trending {isTrendingUp ? 'up' : 'down'} today
//             {isTrendingUp ? '↑' : '↓' } */}
//             {isTrendingUp ? (
//               <TrendingUp width={16} height={16} />
//             ) : (
//               <TrendingDown width={16} height={16} />
//             )}
//           </p>
//         </div>
//         // <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
//         //   {isPositive ? '+' : ''}
//         //   {priceChange.toFixed(2)}%
//         // </span>
//       )
//     },
//   },
//   {
//     header: 'Price',
//     cellClassName: 'price-cell',
//     cell: (coin) => coin.item.data.price_change_percentage_24h.usd,
//   },
// ]
const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item

      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      )
    },
  },
  {
    header: '24h Change',
    cellClassName: 'change-cell',
    cell: (coin) => {
      const item = coin.item
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0

      return (
        <div
          className={cn(
            'price-change',
            isTrendingUp ? 'text-green-500' : 'text-red-500'
          )}
        >
          <p className='flex items-center'>
            {formatPercentage(item.data.price_change_percentage_24h.usd)}
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
        </div>
      )
    },
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => formatCurrency(coin.item.data.price),
  },
]

const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      data: {
        price: 10000,
        price_change_percentage_24h: {
          usd: 0.5,
        },
      },
    },
  },
  // Add more dummy coins as needed
]

// interface TrendingCoin {
//   id: string
//   title: string
//   price: number
// }

const MainPage = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <div id='coin-overview'>
          <div className='header pt-2'>
            <Image
              src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
              alt='Bitcoin logo'
              width={56}
              height={56}
              className='border-muted rounded-full border'
            />
            <div className='info'>
              <p className='name'>Bitcoin / BTC</p>
              <h1 className='price'>$90,636.00</h1>
            </div>
          </div>
        </div>

        <p>Trending Coins</p>

        {/* <DataTable columns={[{ header: 'Title' }, { header: 'Price' }]} /> */}
        <DataTable
          data={dummyTrendingCoins}
          // data={trendingCoins.coins.slice(0, 6) || []}
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName='trending-coins-table'
          // headerCellClassName="py-3!"
          // bodyCellClassName="py-2!"
        />
      </section>

      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default MainPage
