import React, { Component } from 'react'
import './gallery.css'

const styles = {
    wrapper: {
        display: "flex",
        width: "90%",
        maxWidth: "1200px",
        margin: "10px auto",
	}
}

class Gallery extends Component
{
    state = {
		cols: 3
	}

	handleWindowResize()
	{
		console.log("window resized")
	}

	onComponentDidMount()
	{
		window.addEventListener("resize", this.handleWindowResize);
	}

	onComponentWillUnmount()
	{
		window.removeEventListener("resize", this.handleWindowResize);
	}
	 
	createGrid ()
	{
		let grid = [];
		for (let i = 0; i < this.state.cols; i++)
		{
			let col = [];
			for (let n = 0; n < 5; n++)
			{
				let key = (''+i)+(''+n)
				col.push(<img src="https://picsum.photos/id/242/240/300" alt="img" className="img" key={key} />)
			}
			grid.push(<div className="column" key={''+i}> {col} </div>);
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

export default Gallery;