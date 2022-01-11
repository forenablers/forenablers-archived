import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { DiscussionEmbed } from 'disqus-react'

import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'
import { runFacebookJs, runTwitterJs } from '../utils/social-buttons'
import { styles } from '../fe-styles';

import 'katex/dist/katex.min.css'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    runFacebookJs();
    runTwitterJs();
    setTimeout(() => { this.setState({ showSocial: true }) }, 2000);
  }

  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const { previous, next } = this.props.pathContext;
    const blogPostUrl = post.frontmatter.postUrl;
    const disqusShortname = "forenablers.disqus.com";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} >
          <style>{styles}</style>
          <script src="https://apis.google.com/js/platform.js" async defer />
        </Helmet>
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1 / 2),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>

        <div style={{ minHeight: 60, visibility: this.state.showSocial ? 'visible' : 'hidden' }}>
          <a href="https://twitter.com/share" className="twitter-share-button" data-show-count="true">Tweet</a>
          <div className="fb-like" data-href={blogPostUrl} data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true" />
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <div style={{ minHeight: 60, visibility: this.state.showSocial ? 'visible' : 'hidden' }}>
          <a href="https://twitter.com/share" className="twitter-share-button" data-show-count="true">Tweet</a>
          <div className="fb-like" data-href={blogPostUrl} data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true" />
        </div>

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <a href={post.frontmatter.authorProfileLink} target="_blank">{post.frontmatter.author}</a>

        {/* <Bio  /> */}



        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        authorProfileLink
      }
    }
  }
`
