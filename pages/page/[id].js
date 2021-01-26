import React from 'react'
//import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/layout'
import TopHeadBox from '../../components/TopHeadBox'
import PagingBox from '../../components/PagingBox'
import IndexRow from '../IndexRow';
import LibPagenate from '../../libs/LibPagenate'
//
function Page(data) {
  var items = data.blogs.contents
  var paginateDisp = data.display
  var page = data.page
//console.log("display=", data.display)  
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
//                console.log(item.id ,item.createdAt )
                return (<IndexRow key={index}
                  id={item.id} title={item.title}
                  date={item.createdAt} />       
                )
              })}
              <hr /> 
              <PagingBox page={page} paginateDisp={paginateDisp} />              
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )  
}
//
export const getStaticProps = async context => {
  const page = context.params.id;
//console.log("page=", page)
  LibPagenate.init()
  var pageInfo=LibPagenate.get_page_start(page)
//console.log(pageInfo)
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  var url = `https://jamstack-test-kuc.microcms.io/api/v1/blog1?orders=-publishedA`
    url += "&offset=0&limit=1000"
//console.log( url)
  const resCount = await fetch( url, key );
  const countItems = await resCount.json();
  var count = countItems.contents.length

  url = `https://jamstack-test-kuc.microcms.io/api/v1/blog1?orders=-publishedA`
  url += `&offset=${pageInfo.start}&limit=${pageInfo.limit}`
//console.log( url)   
  const res = await fetch( url, key );
  const blogs = await res.json();
//console.log( blogs)   
  var display = LibPagenate.is_next_display(page, count)
//console.log("display=", display)   
  return {
    props : {
      blogs: blogs, display: display, page: page
    }
  };
}
export async function getStaticPaths() {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };  
  var url = `https://jamstack-test-kuc.microcms.io/api/v1/blog1?orders=-publishedA`
    url += "&offset=0&limit=1000"
//console.log( url) 
  const res = await fetch(
    url,
    key
  );
  const blogs = await res.json(); 
//console.log(blogs.contents.length ) 
  LibPagenate.init()
  var pageMax =LibPagenate.get_max_page(blogs.contents.length)
//console.log( "pageMax=", pageMax)
  pageMax = Math.ceil(pageMax)
  var paths = []
  for(var i= 1 ; i<= pageMax; i++ ){
    var item = {
      params : {
        id: String(i)
      } 
    }
    paths.push(item)
  }
  return {
    paths: paths,
    fallback: false,
  }
}

export default Page
