import React, { Component } from 'react'
import './gallery.css'
import debounce from 'lodash.debounce'
import Thumbnail from '../thumbnail'

const styles = {
    wrapper: {
        display: "flex",
        width: "90%",
        maxWidth: "960px",
        margin: "10px auto",
	}
}

class Gallery extends Component
{
	constructor()
	{
		super()

		this.state = {
			error: false,
			isLoading: false,
			cols: 3,
			thumbnails: 30,
			images: []
		}

		this.handleWindowResize = this.handleWindowResize.bind(this)

		window.onscroll = debounce(() => {
			const {
				state: {
				  error,
				  isLoading
				},
			  } = this;

			  if (error || isLoading) return;

			  if (
				window.innerHeight + document.documentElement.scrollTop
				=== document.documentElement.offsetHeight
			  ) {
				this.loadNextBatch();
			  }
		}, 100)
	}

	handleWindowResize()
	{
		if (window.innerWidth >= 960) // tablet
			this.setState({
				cols: 3
			})
		else if (window.innerWidth < 960 && window.innerWidth > 480) // tablet
			this.setState({
				cols: 2
			})
		else
			this.setState({
				cols: 1
			})
	}

	componentDidMount()
	{
		this.handleWindowResize()
		window.addEventListener("resize", this.handleWindowResize)
		this.loadNextBatch()
	}

	componentWillUnmount()
	{
		console.log("component is unmounting")
		window.removeEventListener("resize", this.handleWindowResize)
	}
	 
	createGrid ()
	{
		let grid = [];
		for (let i = 0; i < this.state.cols; i++)
		{
			let col = []
			let images = this.state.images
			for (let j = i; j < this.state.images.length; j += this.state.cols)
			{
				col.push(images[j])
			}
			grid.push(<div className="column" key={''+i}>{ col }</div>)
		}

		return grid;
	}

	loadNextBatch ()
	{
		let images = this.state.images
		let l = images.length
		for(let i = 0; i < 30; i++)
		{
			images.push(<Thumbnail href="https://picsum.photos/200/300" key={l+i} />)
		}

		this.setState({
			images
		})
	}

    render()
    {
        return(
            <div style={styles.wrapper}>
				{this.createGrid()}
            </div>
        )
    }
}

export default Gallery