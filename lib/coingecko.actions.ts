'use server'

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY

if (!BASE_URL) throw new Error('Could not get base url')
if (!API_KEY) throw new Error('Could not get api key')

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  )

  console.log('CoinGecko API URL:', url)

  const response = await fetch(url, {
    headers: {
      'x-cg-pro-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  })

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}))

    throw new Error(
      `API Error: ${response.status}: ${
        errorBody.error || response.statusText
      } `
    )
  }

  return response.json()
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null
): Promise<PoolData> {
  const fallback: PoolData = {
    id: '',
    address: '',
    name: '',
    network: '',
  }

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`
      )

      return poolData.data?.[0] ?? fallback
    } catch (error) {
      console.log(error)
      return fallback
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      '/onchain/search/pools',
      { query: id }
    )

    return poolData.data?.[0] ?? fallback
  } catch {
    return fallback
  }
}

// 'use server'

// import qs from 'query-string'

// const BASE_URL =
//   process.env.COINGECKO_BASE_URL || 'https://pro-api.coingecko.com/api/v3'
// const API_KEY = process.env.COINGECKO_API_KEY || 'CG-pp17xkTLYcxb4r9DaAw1Q2iZ'

// if (!BASE_URL) {
//   throw new Error('COINGECKO_BASE_URL is not defined')
// }
// if (!API_KEY) {
//   throw new Error('COINGECKO_API_KEY is not defined')
// }

// //https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&locale=en

// export async function fetcher<T>(
//   endpoint: string,
//   params?: QueryParams,
//   revalidate = 60
//   //   url: string
// ): Promise<T> {
//   const url = qs.stringifyUrl(
//     { url: `${BASE_URL}/${endpoint}`, query: params },
//     { skipEmptyString: true, skipNull: true }
//   ) //`${BASE_URL}/${endpoint}?${qs.stringify(params)}`
//   const res = await fetch(url, {
//     headers: {
//       //   'x-cg-demo-api-key': 'true',
//       // 'x-cg-api-key': API_KEY,
//       'x-cg-pro-api-key': API_KEY,
//       'Content-Type': 'application/json',
//       //   'X-CoinAPI-Key': API_KEY,
//     } as Record<string, string>,
//     next: { revalidate },
//   })

//   if (!res.ok) {
//     console.error('CoinGecko API URL:', url)
//     console.error('CoinGecko API error:', res.status, res.statusText)
//     //
//     const errorBody: CoinGeckoErrorBody = await res.json().catch(() => ({}))
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// export async function fetchCoinById(coinId: string) {
//   const url = `${BASE_URL}/coins/${coinId}?${qs.stringify({
//     localization: false,
//     tickers: false,
//     market_data: true,
//     community_data: false,
//     developer_data: false,
//     sparkline: false,
//   })}`
//   const res = await fetch(url, {
//     headers: {
//       'X-CoinAPI-Key': API_KEY,
//     },
//   })
//   return res.json()
// }

// export const fetchCoins = async () => {
//   const url = `${BASE_URL}/coins/markets?${qs.stringify({
//     vs_currency: 'usd',
//     order: 'market_cap_desc',
//     per_page: 10,
//     sparkline: false,
//     price_change_percentage: '24h',
//     locale: 'en',
//   })}`
//   const res = await fetch(url, {
//     headers: {
//       'X-CoinAPI-Key': API_KEY,
//     },
//   })
//   return res.json()
// }
