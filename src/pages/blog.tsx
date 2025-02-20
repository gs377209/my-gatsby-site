import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { graphql, PageProps } from "gatsby";

const BlogPage = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <ul>
        {data.allFile.nodes.map((node) => (
          <li key={node.name}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogPage {
    allFile {
      nodes {
        name
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;
