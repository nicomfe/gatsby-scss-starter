/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const slash = require('slash')

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const rugbyQuizTemplate = path.resolve('./src/pages/rugbyQuiz.js')
  const slug = 'rebel-sport-rugby-quiz'
  createPage({
    path: slug,
    component: slash(rugbyQuizTemplate),
    context: { slug },
  })

  const StepOneTemplate = path.resolve('./src/pages/contactBySteps/step1.js')
  const slugStepOne = 'contact-step-1'
  createPage({
    path: slugStepOne,
    component: slash(StepOneTemplate),
    context: { slug },
  })

  const StepTwoTemplate = path.resolve('./src/pages/contactBySteps/step2.js')
  const slugStepTwo = 'contact-step-2'
  createPage({
    path: slugStepTwo,
    component: slash(StepTwoTemplate),
    context: { slug },
  })
}
