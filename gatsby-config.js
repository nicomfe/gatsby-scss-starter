const pixrem = require('pixrem')
const autoprefixer = require('autoprefixer')

module.exports = {
  siteMetadata: {
    title: 'Dunam Ingeniería',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          pixrem(),
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
        ],
        precision: 8,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
