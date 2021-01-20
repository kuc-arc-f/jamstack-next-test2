import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
console.log(data.blogs)
  var items = data.blogs.contents
  return (
    <Layout>
      <div className="body_main_wrap">
        <div className="container">test:
        <ul>
        {items.map((item, index) => {
          return (<IndexRow key={index}
                  id={item.id} title={item.title} />       
          )
        })}      
        </ul>
        </div>
      </div>
    </Layout>
    )
}
export const getStaticProps = async context => {
console.log( process.env.API_KEY )
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch(
    `https://jamstack-test-kuc.microcms.io/api/v1/blog1`,
    key,
  );
  const blogs = await res.json();
  console.log(blogs)
  return {
    props : {
      blogs: blogs,
    }
  };
}
export default Page
