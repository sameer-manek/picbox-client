import React, { Component, Suspense } from 'react'
import './gallery.css'
import Spinner from '../spinner'

const Thumbnail = React.lazy(() => import('../thumbnail'))

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
			cols: 3,
			thumbnails: 30
		}

		this.handleWindowResize = this.handleWindowResize.bind(this)
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
		this.handleWindowResize();
		window.addEventListener("resize", this.handleWindowResize)
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
			let col = [];
			for (let n = 0; n < this.state.thumbnails / this.state.cols; n++)
			{
				let key = (''+i)+(''+n)
				col.push(<Suspense fallback={<Spinner />}> <Thumbnail /> </Suspense>)
			}
			grid.push(<div className="column" key={''+i}> {col} </div>)
		}

		return grid;
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