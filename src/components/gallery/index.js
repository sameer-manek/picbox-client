import React, { Component } from 'react'
import axios from 'axios'
import './gallery.css'
import debounce from 'lodash.debounce'
import Thumbnail from '../thumbnail'
import UploadWindow from '../uploadWindow'
import Dropzone from '../dropzone'

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
			currentIndex: 0,
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
		let l = this.state.currentIndex
		axios.get("http://localhost:5000/images/thumbnails/"+this.state.currentIndex + 1).then(response => {
			let uris = response.data

			uris.forEach(element => {
				images.push(<Thumbnail href={element} key={++l} />)
			});

			this.setState({
				images: images,
				currentIndex: l
			})
		})
	}

    render()
    {
        return(
            <div style={styles.wrapper}>
				<Dropzone />
				{this.createGrid()}

				<UploadWindow />
            </div>
        )
    }
}

export default Gallery