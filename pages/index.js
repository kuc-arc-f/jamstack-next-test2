import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
//console.log(data.blogs.contents)
  var items = data.blogs.contents
  return (
    <Layout>
      <TopHeadBox />
      <div className="body_main_wrap">
        <div className="container">
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h2 className="h4_td_title mt-2 mb-2" >Post</h2>
                </div>
              </div>
              {items.map((item, index) => {
                //console.log(item.id ,item.createdAt )
                return (<IndexRow key={index}
                        id={item.id} title={item.title} date={item.createdAt} />       
                )
              })}              
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )  
}
//
export const getStaticProps = async context => {
//console.log( process.env.API_KEY )
    const key = {
      headers: {'X-API-KEY': process.env.API_KEY},
    };
    const res = await fetch(
      `https://jamstack-test-kuc.microcms.io/api/v1/blog1`,
      key,
    );
    const blogs = await res.json();
//    console.log(blogs)
    return {
      props : {
        blogs: blogs,
      }
    };
  }
export default Page
