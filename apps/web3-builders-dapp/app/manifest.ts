import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WEB3 Builders DAO Dapp',
    short_name: 'WEB3 Builders',
    description: 'An open source web3 builders DAO dapp. Created for needs of the web3 builders community on discord.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: './Web3Builders.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: './Web3Builders.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}