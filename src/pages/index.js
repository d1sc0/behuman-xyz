import React from 'react'
import { Link, graphql} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import style from '../styles/content.module.css'


const IndexPage = ({ data }) => {
  const latestEpisode = data.allMdx.edges[0].node
  const mins = Math.floor(latestEpisode.frontmatter.duration/60)
  const secs = latestEpisode.frontmatter.duration - mins * 60
  return (
  <Layout>
    <SEO
      title="Home"
      description="Another Talk Show - A podcast of interviews of talented people who aren't yet famous!"
    />
    <div className={style.post}>
      <div className={style.postContent}>
        <p className={style.introText}>
          A talk show where a <Link to="/about">fairly ordinary host </Link>interviews <Link to="/about">talented people</Link> who aren't yet famous!
        </p>
      <div className={style.player}>
        <h1>LATEST EPISODE</h1>
        <h2>
          {latestEpisode.frontmatter.title}
        </h2>
          <div className={style.meta}>
              S{latestEpisode.frontmatter.season}:E{latestEpisode.frontmatter.episodeNumber}
              {' // '}
              {latestEpisode.frontmatter.date}
              {' // '}
              {mins} mins {secs} secs
            </div>
          {latestEpisode.frontmatter.url ? ( <audio src={latestEpisode.frontmatter.url} controls>Your browser does not support the audio player! <a href={latestEpisode.frontmatter.url}>You can download here instead</a></audio> ) : null}
             
          <Link to={latestEpisode.frontmatter.path} className={style.readMore}>
              Read the show notes...
            </Link>
        </div>
      </div>
    </div>
  </Layout>
)}

export const data = graphql`
  query{
    allMdx(
      filter: { fileAbsolutePath: { regex: "//episodes//" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            path
            tags
            url
            duration
            season
            episodeNumber
          }
          fields {
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`

export default IndexPage
