var React = require("react");

var tdStyle = {
	verticalAlign: 'middle'	
};

var CalculatorButton = React.createClass({
	render: function(){
		var colSpan;
		if(this.props.colSpan){
			colSpan = this.props.colSpan;
		} else {
			colSpan = "1";
		}
		return (
			<td className={"CalculatorButton "+this.props.addClass}
				style={tdStyle}
				id={this.props.displayValue}
				onClick={this.props.onClick} 
				colSpan={colSpan}>
				{this.props.displayValue}
			</td>
		);
	}
});

module.exports = CalculatorButton;

