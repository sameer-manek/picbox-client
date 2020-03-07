import React, { Component } from 'react'
import axios from 'axios'
import './gallery.css'
import debounce from 'lodash.debounce'
import Thumbnail from '../thumbnail'
import UploadWindow from '../uploadWindow'
import Dropzone from '../dropzone'
import Request from 'superagent'

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
			images: [],
			dropzone: "none"
		}

		this.handleWindowResize = this.handleWindowResize.bind(this)
		this.toggleDropZone = this.toggleDropZone.bind(this)
		this.handleFiles = this.handleFiles.bind(this)

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

	handleFiles(files)
	{
		// close the dropzone and upload files
		this.toggleDropZone()
		Request.post('http://localhost:5000/upload')
			.set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
			.send(files[0])
			.on('progress', function(e) {
				console.log('Progress', e.percent);
			}.bind(this))
			.end((err, res) => {
				console.log(err);
				console.log(res);
			})
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

	toggleDropZone()
	{
		let dropzone = this.state.dropzone === "block" ? "none" : "block"
		this.setState({
			dropzone
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
				<Dropzone display={this.state.dropzone} toggle={this.toggleDropZone} handleFiles={this.handleFiles} />
				{this.createGrid()}

				<UploadWindow toggle={this.toggleDropZone} />
            </div>
        )
    }
}

export default Gallery