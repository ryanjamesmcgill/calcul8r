var React = require("react");
var CalculatorButton = require("./CalculatorButton.react");
var mathjs = require("mathjs");
var $ = require('jquery');

var operatorStyle={
	backgroundColor: 'black',
	verticalAlign: 'middle'
};

var Application = React.createClass({
	getInitialState: function(){
		return({
			displayString: ""
		});	
	},
	onEvaluate: function(){
		var displayString = this.state.displayString;
		displayString = displayString.split('x').join('*');
		try{
			mathjs.eval(displayString);
		}
		catch(err){
			this.invalidInput();
			return;
		}

		var result = String(mathjs.eval(displayString));
		this.setState({displayString: result});
	},
	onBackspace: function(){
		var displayString = this.state.displayString;
		displayString = displayString.slice(0,displayString.length-1);
		this.setState({displayString:displayString});	
	},
	onType: function(e){
		var value = e.currentTarget.id;
		var ds = this.state.displayString;
		this.setState({displayString: ds+value});
	},
	onClear: function(){
		this.setState({displayString: ""});
	},
	componentDidMount: function(){
		var initDisplayWidth = $('#display').width();
		this.setState({initDisplayWidth: initDisplayWidth});
		
	},
	componentDidUpdate: function(){
		var displayWidth = $('#display').width();
		var initDisplayWidth = this.state.initDisplayWidth;
		if(displayWidth > initDisplayWidth){
			this.invalidInput();
			this.onBackspace();
		}
	},
	invalidInput: function(){
		console.log('[calcul8r] invalid input');
		//$('#alert').animate({opacity:0.3},10).animate({opacity:0.0},600);
	},
	render: function(){
		var displayString = this.state.displayString;
		if(displayString === ""){
			displayString = "0";
		}
		return (
			<div className = 'container'>
			<h1 style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>Hello Calcul8r</h1>
			<div id="phoneBorder">
				<div id="phoneEar" />
				<table className="table table-bordered" id="calculator" style={{border:'1px solid #333'}}>
				<thead style={{visibility:'collapse', border:'0px none'}}>
			        <tr style={{border:'0px none'}}>
			            <th style={{border:'0px none'}} className="col-xs-3"></th>
			            <th style={{border:'0px none'}} className="col-xs-3"></th>
			            <th style={{border:'0px none'}} className="col-xs-3"></th>
			            <th style={{border:'0px none'}} className="col-xs-3"></th>
			        </tr>
			    </thead>
				<tbody>
					<tr>
						<td colSpan="4" id="display">
							<div id="alert" style={{opacity: 0.0, 
													backgroundColor: '#cc0000', 
													borderRadius: 5,
													position: 'absolute',
													width: 381,
													height: 102}} />
							{displayString}
						</td>
					</tr>
					<tr>
						<CalculatorButton colSpan="2" displayValue="AC" addClass="drkGrey" onClick={this.onClear}/>
						<CalculatorButton id="del" displayValue="del" addClass="drkGrey" onClick={this.onBackspace} />
						<CalculatorButton displayValue="/" addClass="orange" onClick={this.onType} style={operatorStyle}/>
					</tr>
					<tr>
						<CalculatorButton displayValue="7" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="8" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="9" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="x" addClass="orange" onClick={this.onType}/>
					</tr>
					<tr>
						<CalculatorButton displayValue="4" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="5" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="6" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="-" addClass="orange" onClick={this.onType}/>
					</tr>
					<tr>
						<CalculatorButton displayValue="1" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="2" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="3" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="+" addClass="orange" onClick={this.onType}/>
					</tr>
					<tr>
						<CalculatorButton colSpan="2" displayValue="0" addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="." addClass="litGrey" onClick={this.onType}/>
						<CalculatorButton displayValue="=" addClass="orange" onClick={this.onEvaluate}/>
					</tr>
				</tbody>
				</table>
				<div id="phoneButton" />
			</div>
			</div>
		);
	}
});

module.exports = Application;

