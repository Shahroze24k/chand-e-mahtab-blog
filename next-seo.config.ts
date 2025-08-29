import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Chand-e-Mahtab',
  defaultTitle: 'Chand-e-Mahtab',
  description: 'Moonlight of knowledge and youth - A bilingual blog sharing insights in English and Urdu',
  canonical: process.env.SITE_URL || 'http://localhost:3000',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'Chand-e-Mahtab',
    title: 'Chand-e-Mahtab',
    description: 'Moonlight of knowledge and youth - A bilingual blog sharing insights in English and Urdu',
    images: [
      {
        url: `${process.env.SITE_URL || 'http://localhost:3000'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Chand-e-Mahtab',
      },
    ],
  },
  twitter: {
    handle: '@chandemahab',
    site: '@chandemahab',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'Chand-e-Mahtab',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/logo.svg',
      sizes: '76x76',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

export default config;
