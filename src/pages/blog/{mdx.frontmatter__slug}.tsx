import * as React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { graphql, HeadProps, PageProps } from "gatsby";

const BlogPost = ({ data, children }: PageProps<Queries.BlogPostQuery>) => {
  return (
    <Layout pageTitle={data.mdx?.frontmatter?.title ?? ""}>
      <p>{data.mdx?.frontmatter?.date}</p>
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
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;

export const Head = ({ data }: HeadProps<Queries.BlogPostQuery>) => (
  <Seo title={data.mdx?.frontmatter?.title ?? ""} />
);
