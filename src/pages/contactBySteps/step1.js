import React from 'react'

import Layout from '../../components/layout'
import FormStepOne from '../../components/contact/steps/StepOne'
import ContactTheme from '../../components/layout/ContactTheme'

const IndexPage = () => (
  <Layout>
    <ContactTheme>
      <FormStepOne />
    </ContactTheme>
  </Layout>
)

export default IndexPage
