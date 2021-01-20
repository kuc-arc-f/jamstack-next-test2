import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import marked from  'marked'

import LibTask from '../libs/LibTask';
import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibCms from '../libs/LibCms'
//
export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = { title: "", content: "", date:""}
//    this.id  = parseInt(this.props.id)
    this.id  = this.props.id
console.log(this.id )
  }
  componentDidMount(){
    this.get_items(this.id)
  } 
  static async getInitialProps(ctx) {
    console.log(ctx.query.id)
    var id = ctx.query.id
      return {
          id: id,
      };
  }     
  async get_items(id){
    try{
      var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
      var url = '/cms.json?' + dt
console.log(url )
      const req = await fetch( url );
      const data = await req.json();
      var items = LibCommon.convert_items(data.items )
      var item  = LibCms.get_show_item( items, String(id) )
      item.content = marked(item.content)
console.log(item )
      this.setState({ 
        title: item.title, 
        content: item.content,
        date : item.created_at
      });        
    } catch (err) {
        console.log(err);
    }
  }  
  render() {
    return (
    <Layout>
      <div className="container">
        <Link href="/" >
          <a className="btn btn-outline-primary mt-2">Back</a>
        </Link>
        <hr className="mt-2 mb-2" />
        <div className="show_head_wrap">
            <i className="fas fa-home"></i> >
            {this.state.title}
        </div>
        <hr />
        <div><h1>{this.state.title}</h1>
        </div>
        date : {this.state.date} <br />  
        <hr />
          <div id="post_item"
          dangerouslySetInnerHTML={{ __html: this.state.content }} />        
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
    )
  }
}
