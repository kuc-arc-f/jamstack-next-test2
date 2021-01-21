import React from 'react'
import Link from 'next/link';

import marked from  'marked'

import Layout from '../../components/layout'
//import LibCommon from '../libs/LibCommon'
//
const BlogId = ({blog}) => {
//console.log(blog)
  var content = marked(blog.content)
  return (
  <Layout>
    <div className="container">
      <Link href="/" >
        <a className="btn btn-outline-primary mt-2">Back</a>
      </Link>
      <hr className="mt-2 mb-2" />
      <div className="show_head_wrap">
          <i className="fas fa-home"></i> >
          {blog.title}
      </div>
      <hr />            
      <h1>{blog.title}</h1>
      Date: {blog.createdAt}
      <hr />
      <div dangerouslySetInnerHTML={{__html: `${content}`}}></div>
    </div>
    <style>{`
      div#post_item > p > img{
        max-width : 100%;
        height : auto;
      }
      div#post_item > hr {
        height: 1px;
        background-color: #000;
        border: none;
      }
      .show_head_wrap{ font-size: 1.4rem; }
      `}</style>      
  </Layout>  
  );
};
//
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch('https://jamstack-test-kuc.microcms.io/api/v1/blog1', key);
  const repos = await res.json();
  const paths = repos.contents.map(repo => `/posts/${repo.id}`); 
  return {paths, fallback: false};
};
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch(
    `https://jamstack-test-kuc.microcms.io/api/v1/blog1/${id}`,
    key,
  );
  const blog = await res.json();
  return {
    props : {
      blog: blog,
    }
  };
};

export default BlogId;
