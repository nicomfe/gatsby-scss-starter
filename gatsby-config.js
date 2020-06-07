const pixrem = require('pixrem')
const autoprefixer = require('autoprefixer')

module.exports = {
  siteMetadata: {
    title: 'Bookings | New Brew Bar & Restaurant',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          pixrem(),
          autoprefixer(),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-T6BTDZ9',
        includeInDevelopment: false,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#e5383a',
        display: 'minimal-ui',
        icon: 'static/images/favicon-32x32.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
