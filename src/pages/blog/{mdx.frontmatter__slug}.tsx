import * as React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { graphql, HeadProps, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPost = ({ data, children }: PageProps<Queries.BlogPostQuery>) => {
  // @ts-expect-error internal null properties
  const image = getImage(data.mdx?.frontmatter?.hero_image ?? null);

  return (
    <Layout pageTitle={data.mdx?.frontmatter?.title ?? ""}>
      <p>{data.mdx?.frontmatter?.date}</p>
      {image && (
        <GatsbyImage
          image={image}
          alt={data.mdx?.frontmatter?.hero_image_alt ?? ""}
        />
      )}
      <p>
        Photo Credit:{" "}
        <a href={data.mdx?.frontmatter?.hero_image_credit_link ?? ""}>
          {data.mdx?.frontmatter?.hero_image_credit_text}
        </a>
      </p>
      {children}
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: HeadProps<Queries.BlogPostQuery>) => (
  <Seo title={data.mdx?.frontmatter?.title ?? ""} />
);
