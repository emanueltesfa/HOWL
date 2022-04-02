import React from "react"
import { render } from "react-dom"
import InfiniteScroll from "react-infinite-scroll-component"

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
}

export class ScrollWizard extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    console.log("Fetching")
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 })),
      })
    }, 1500)
  }

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    )
  }
}
