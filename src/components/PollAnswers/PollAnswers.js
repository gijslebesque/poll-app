import React, { Component } from "react";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";

class PollAnswers extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const data = [
			{ x: 0, y: 8 },
			{ x: 1, y: 5 },
			{ x: 2, y: 4 },
			{ x: 3, y: 9 },
			{ x: 4, y: 1 },
			{ x: 5, y: 7 },
			{ x: 6, y: 6 },
			{ x: 7, y: 3 },
			{ x: 8, y: 2 },
			{ x: 9, y: 0 }
		];
		return (
			<section>
				{this.props.children}

				<XYPlot height={300} width={300}>
					<XAxis />
					<YAxis />
					<VerticalBarSeries data={data} />
				</XYPlot>
			</section>
		);
	}
}

export default PollAnswers;
