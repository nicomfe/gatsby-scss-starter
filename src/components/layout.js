import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import NavBar from './navbar'
import Footer from './footer'
import './layout.css'

const Layout = ({ children }) => {
  const description = 'The team at New Brew Bar and Restaurant enjoy catering for all their community’s dining and entertainment needs, with their impressive bar facilities, fun weekly activities including live bands every Friday and Saturday night, and of course the sumptuous New Brew menu. For 16 years New Brew has been the place to go for good times with friends, after work drinks, or to relax and unwind after a hard day.'
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <div>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: 'bar, restaurat, auckland, craft beers, beers, wines, live music, poker night, quiz night' },
              { name: 'title', content: 'Bookings - New Brew Bar' },

            ]}
          >
            <html lang='en' />
            <link rel='apple-touch-icon' sizes='180x180' href='images/apple-touch-icon.png' />
            <link rel='icon' type='image/png' sizes='32x32' href='images/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='images/favicon-16x16.png' />
            <link rel='manifest' href='images/site.webmanifest' />
            <link rel='mask-icon' href='images/safari-pinned-tab.svg' color='#e5383a' />
            <meta property='og:title' content='Bookings - New Brew Bar' />
            <meta property='og:type' content='website' />
            <meta property='og:url' content='https://bookings.newbrew.co.nz' />
            <meta property='og:description' content={description} />
            <meta property='og:image' content='https://bookings.newbrew.co.nz/images/OG.png' />
            <meta property='og:image:url' content='http://bookings.newbrew.co.nz/images/OG.png' />
            <meta property='og:image:secure_url' content='https://bookings.newbrew.co.nz/images/OG.png' />
            <meta name='msapplication-TileColor' content='#ffffff' />
            <meta name='theme-color' content='#ffffff' />
          </Helmet>
          <div>
            <noscript>
              <iframe
                title='Google Tag Manager'
                src='https://www.googletagmanager.com/ns.html?id=GTM-T6BTDZ9'
                height='0'
                width='0'
                style={{ display:'none', visibility: 'hidden' }}
              />
            </noscript>
            <NavBar />
            <div className='hero-container'>
              <div className='hero-content'>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
