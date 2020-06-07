import React from 'react'

import Layout from '../components/layout'
import ContactTheme from '../components/layout/ContactTheme'
import Hero from '../components/hero'

const IndexPage = () => (
  <Layout>
    <ContactTheme>
      <Hero />
    </ContactTheme>
  </Layout>
)

export default IndexPage
