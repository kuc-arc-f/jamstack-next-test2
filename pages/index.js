import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
import PagesRow from './PagesRow';
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
//    this.state = {items: '', items_org: ''}
    this.state = {items: '', page_items: '', pagenate_display: 0,}
    this.page = 1
    this.handleClickPagenate = this.handleClickPagenate.bind(this);
    this.handleClickPagenateP1 = this.handleClickPagenateP1.bind(this);
//console.log(this.props.data )
  }
  async componentDidMount(){
    this.get_items()
  }
  async get_items(){
    try{
      var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
      var url = '/cms.json?' + dt
  console.log(url )
      const req = await fetch( url );
      const data = await req.json(); 
      var items =  LibCommon.get_reverse_items(data.items)
      LibPagenate.init()
      var page_info =  LibPagenate.get_page_start(this.page)
      var is_paginate = LibPagenate.is_paging_display(items.length)
      items = LibPagenate.getOnepageItems(items, page_info.start , page_info.end)
//console.log(items )
      this.setState({
        items: items ,page_items: data.page_items ,
        pagenate_display: is_paginate
      })
    } catch (err) {
        console.log(err);
    }    
  } 
  pageRow(){
    return this.state.page_items.map(function(item, i){
//      console.log(item )
        return <PagesRow save_id={item.save_id} key={i} 
        title={item.title} />
    })                            
  }
  pageDisp(){
    if(this.state.page_items instanceof Array){
      return(
      <div className="pages_wrap">
        <div className="row conte mt-0 mb-2">
          <div className="col-sm-12">
            <h2 className="h4_td_title mt-2" >Pages</h2>
            <div className="page_btn_wrap mb-0">
                {this.pageRow() }
            </div>
          </div>
        </div>
      </div>        
      )
    }
  }  
  tabRow(){
    const items = this.state.items
    if(items instanceof Array){
// console.log(items )
      return items.map((item, index) => {
        return (<IndexRow key={index}
          id={item.id} show_id={item.show_id} title={item.title}
          created_at={item.created_at} />        
        )
      })      
    }
  }
  handleClickPagenateP1(){
    this.page = 1
    this.get_items()
  }
  handleClickPagenate(){
    var page = this.page
    this.page = page + 1
console.log( "page=", this.page )
    this.get_items()
  }
  dispPagenate(){
    if(this.state.pagenate_display ===1){
      return(
      <div className="paginate_wrap">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button onClick={this.handleClickPagenateP1} className="btn btn-lg btn-outline-primary">
              1st
          </button>
          <button onClick={this.handleClickPagenate} className="btn btn-lg btn-outline-primary">
              >
          </button>
        </div>
      </div>
      )
    }
}   
  render() {
//console.log( this.state.page_items)
    return (
    <Layout>
      <TopHeadBox />
      <div className="body_main_wrap">
        <div className="container">
          <div className="btn_disp_ara_wrap mt-0">
            {this.pageDisp()}
          </div>          
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h2 className="h4_td_title mt-2 mb-2" >Post</h2>
                </div>
              </div>
              {this.tabRow()}
              {this.dispPagenate()}
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )
  }
}
