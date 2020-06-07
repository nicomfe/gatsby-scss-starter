import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'stringquery'

import Layout from '../../components/layout'
import FormStepTwo from '../../components/contact/steps/StepTwo'
import ContactTheme from '../../components/layout/ContactTheme'

const IndexPage = ({ location }) => {
  const search = location && location.search ? queryString(location.search) : null
  if (search && search.email) {
    return (
      <Layout>
        <ContactTheme>
          <FormStepTwo email={search.email} />
        </ContactTheme>
      </Layout>
    )
  }
  return <div>.</div>
}

IndexPage.propTypes = {
  location: PropTypes.object,
}

export default IndexPage
