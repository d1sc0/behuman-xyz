import React from 'react'
import { Link, graphql} from 'gatsby'
import Layout from '../components/layout'
import Image from 'gatsby-image'
import Subscribe from '../components/subscribe'
import Player from '../components/player'
import SEO from '../components/seo'
import style from '../styles/content.module.css'


const IndexPage = ({ data}) => {
  
  const homeImage =  data.homeImage.childImageSharp.fluid
  const {
    frontmatter: { title, date, path, url, duration, tags, season, episodeNumber, subtitle },
  } = data.allMdx.edges[0].node
  
  const mins = Math.floor(duration / 60)
  const secs = duration - mins * 60
  return (
  <Layout>
    <SEO
      title=""
      description="Another Talk Show - A fairly ordinary host interviews interesting people who aren't famous. Interesting, talented people who are trying to make the world a little bit brighter or better!"
    />
    <div className={style.post}>
      <div className={style.postContent}>

        <div className={style.home}>
            <Image
              fluid={homeImage}
              className={style.homeImage}
              alt="Another Talk Show Cover"
            />
            

            <div className={style.homeText}>
              A <span className={style.accent}>fairly ordinary host</span> interviews <span className={style.accent}>interesting people</span> who aren't famous.<br/>
              <Link to="/about" className={style.aboutLink}>Find out more...</Link>
            </div>
        </div>

        <Player 
          title={title}
          date={date}
          path={path}
          tags={tags}
          url={url}
          season={season}
          episodeNumber={episodeNumber}
          subtitle={subtitle} 
          mins={mins}
          secs={secs}
        />

        <Subscribe />

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
        }
      }
    }
    homeImage: file(relativePath: { eq: "another-talk-show-home.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 615, quality: 100){
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
