const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static("public"));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
app.get('/', (req, res) => res.send("Welcome to the root!"))
app.get('/form', (req, res) => res.send(form.html))
app.get('/mail', handleMail);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});


/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/

function handleMail(request, response) {
    console.log("Starting the mail calculation...")
	const mailOperation = request.query.mailType;
	console.log("Mail Operations: "+mailOperation);
	//const pounds = Number(request.query.pounds);
	//console.log("Mail Pounds: "+pounds);
	const ounces = Number(request.query.ounces);
	console.log("Mail Ounces: "+ounces);

	// TODO: Here we should check to make sure we have all the correct parameters

	computeCost(response, mailOperation, ounces);
}

function computeCost(response, op, oz) {
	//op = op.toLowerCase();

	let cost = 0;

	if (op == "Letters (Stamped)") {
		if(oz==1){
			cost=.55;
		}else if(oz==2){
			cost=.7;
		}else if(oz==3){
			cost=.85;
		}else if(oz>=3.5){
			cost=1;
		}
	} else if (op == "Letters (Metered)") {
		if(oz==1){
			cost=.50;
		}else if(oz==2){
			cost=.65;
		}else if(oz==3){
			cost=.80;
		}else if(oz>=3.5){
			cost=.95;
		}		
	} else if (op == "Large Envelopes (Flats)") {
		cost = 1 +(oz-1)*.2;
	} else if (op == "First-Class Package Service-Retail") {
		if(oz<=4){
			cost=3.8;
		}else if(oz>4 && oz<=8){
			cost=4.6;
		}else if(oz>8 && oz<=12){
			cost=5.3;
		}else if(oz>12){
			cost=5.9;
		}	
	} else {
		
	}
	console.log("Cost: " + cost);

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {operation: op, weight: oz, cost: cost};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}