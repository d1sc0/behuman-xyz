import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Episode from "../components/episode"

const EpisodePostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, date, path, tags, url, duration, season, episodeNumber, subtitle },
    excerpt,
    fields: { readingTime },
    id,
    body,
  } = data.mdx
  const { next, previous } = pageContext

  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <Episode
        key={id}
        title={title}
        date={date}
        path={path}
        readingTime={readingTime}
        body={body}
        tags={tags}
        url={url}
        previousPost={previous}
        nextPost={next}
        duration={duration}
        season={season}
        episodeNumber={episodeNumber}
        subtitle={subtitle}
      />
    </Layout>
  )
}

export default EpisodePostTemplate

EpisodePostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($path: String) {
    mdx(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        path
        tags
        url
        duration
        season
        episodeNumber
        subtitle
      }
      fields {
        readingTime {
          text
        }
      }
      id
      body
      excerpt
    }
  }
`
