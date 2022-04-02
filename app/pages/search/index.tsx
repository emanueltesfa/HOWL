import { ScrollWizard } from "app/core/components/testScroll"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import React from "react"

const Search: BlitzPage = () => {
  return (
    <React.Fragment>
      <div>Search</div>
      <ScrollWizard />
    </React.Fragment>
  )
}

Search.suppressFirstRenderFlicker = true
Search.getLayout = (page) => <Layout title="SearchPage">{page}</Layout>

export default Search
