
var Word = require("./Word");
var inquirer = require("inquirer");
var i = 0;


var cars = ["Saab", "Volvo", "BMW", "Toyota", "Lexus", "Chevrolet", "Chrysler", "Mercedes", "Ford", "Jeep"];
var SelectedWord = "";
var aGuessWord = [];
var aUserKeys = [];
var gNumTries = 0;
var gcMaxTries = 10;
var gWinCtr = 0;
var objWord;
var GuessedWord = ""; 

//generate an index no from 1-10
function GenerateRandomWordIndex()
{
	var GuessWord = "";

    var x = Math.floor((Math.random() * 10) + 1);
   
	
	//console.log("Inside Function");
    return x-1;

}

//show as many dashes as the the length of the computer generated word
function DetermineWordLength(Pos)
{
	var StrWord = cars[Pos];
	var StrDisplayWord = "";
	//var GuessWrd = new Word(StrWord);
	for (var i = 0; i < StrWord.length; i++)
	{
		StrDisplayWord += "-";
		aGuessWord[i] = "-";
		//GuessWrd.AddNewLetter(StrWord.charAt(i));
	}
	// Updated Selected Word
	SelectedWord = cars[Pos];	
	StrDisplayWord = "GuessWord is: " + StrDisplayWord;
	//console.log(SelectedWord);
	
}

//search for the entered letter in the m/c selected word and fill array at all positions where the letter occurs
function CheckAlphabetExists(StrSub)
{
   var n = SelectedWord.indexOf(StrSub);
   //console.log("We are looking for " + StrSub);
   for(var i = 0; i < SelectedWord.length; i++)
   {
		//check if the char matches our value. If so add at that index   	
   		if( SelectedWord.charAt(i) == StrSub)
   		{
   			//console.log("found match")
			aGuessWord[i] = StrSub;   			
   		}
   }
   GuessedWord = objWord.CheckGuessLetterExists(StrSub);
   //console.log("Currently the Guessword is: " + GuessedWord);	
   return n;
}


function DisplayAllOccurenceofGuessedLetter()
{
	var DisplayText = ""
	var Str = "";
	//console.log("In DisplayAllOccurenceofGuessedLetter")

	CheckAlphabetExists(aUserKeys[aUserKeys.length-1]);
	
	//now loop through the array to display the letters and - for user
    for(i = 0; i < aGuessWord.length; i++)
    {
    	DisplayText += aGuessWord[i];
    }
	console.log(DisplayText);	
    //DisplayText = "GuessWord is: " + DisplayText;
	//document.getElementById("guessword").innerHTML = DisplayText;

	//console.log(DisplayText);
	//console.log("Printing Selected Word...");
	//console.log(SelectedWord);
	str = SelectedWord;
	str = DisplayText;
	if(str == SelectedWord)
	{
		console.log("YEAH, found matching");
	}	

    if(DisplayText === SelectedWord)
    {

    	//increment win counter
    	console.log("We have a winner");
    	gWinCtr = gWinCtr+1;
    	var sWinCtr = gWinCtr.toString();
    	console.log("YOU WIN");    		
    	//document.getElementById("Wins").innerHTML = "Your Win Total is: " + sWinCtr;
    	//setTimeout(InitializeGlobals, 3000);
    	//InitializeGlobals();
    	//return;
    }
    else
    {
    	console.log("We have no match between strings");
    }	
    
}

function GenerateWord()
{
	//console.log("calling GenerateRandomWordIndex");
	InitializeGlobals();
	var LtrCnt = GenerateRandomWordIndex();
	//console.log("calling DetermineWordLength");
	DetermineWordLength(LtrCnt);
	var StrDash = "";
	//console.log("after call");
	console.log(LtrCnt);
	//SelectedWord = cars[LtrCnt];
	//console.log(cars[LtrCnt]);
	//console.log("Selected word is:" + SelectedWord);
	//create our Computer Generated Word object
	objWord = new Word(SelectedWord);

}

// initialize all global variables
function InitializeGlobals()
{
	SelectedWord = "";

	aGuessWord.length = 0;
	i = 0;
	aUserKeys.length = 0;
	gNumTries = 0;
	gcMaxTries = 10;
	//document.getElementById("Lives").innerHTML = "Number of Lives Left is: ---";
	//document.getElementById("Wins").innerHTML = "You Win Total is:----"	;
	//document.getElementById("guessword").innerHTML = "GuessWord is: -----";
	//document.getElementById("LettersUsed").innerHTML = "Letters Used is: ------ ";
	//document.getElementById("KeyInput").value = "";
	//document.getElementById("KeyInput").value = "Write a character into this field! ";

}


var ProcessKeys = function()
{

    var keynum;
    var nLives = 0;
    var sLives = "";
    var StrLettersUsed = "";
    //console.log("In Process Keys");
    if(gWinCtr > 0)
    {
    	return;
    }	
    if (gNumTries == 0)
    {
    	GenerateWord();
    }
    
    //for(i = 0; i < gcMaxTries; i++)
    //{	
	    var RecPrompt = function()
	    {
		    //console.log("Inside recursion");
		    if(gWinCtr > 0)
    		{
    			return;
    		}	
		    if(gNumTries < gcMaxTries)
		    {	
			    inquirer
			    .prompt({
			      name: "LetterName",
			      type: "input",
			      message: "Enter a letter for the Word"
			    })
			    
			    .then(function(answer) {
			    	if(gNumTries == gcMaxTries)
			    	{

			    		console.log("You are a LOSER!!!. Please try again")
			    		setTimeout(InitializeGlobals, 1000);
			    		return;

			    	}
			    	aUserKeys.push(answer.LetterName);
			    	for(i=0; i<aUserKeys.length; i++)
			    	{
			    		StrLettersUsed += aUserKeys[i];
			    	}
			    	//alert(String.fromCharCode(keynum));
			    	console.log("Letters Used is: " + StrLettersUsed);
			    	//document.getElementById("LettersUsed").innerHTML = "Letters Used is: " + StrLettersUsed;
					//console.log(answer.LetterName);
					//increment try counter
					gNumTries = gNumTries + 1;
					nLives = gcMaxTries - gNumTries;
					sLives = nLives.toString();
					console.log("Number of Lives Left is: " + sLives);
					//document.getElementById("Lives").innerHTML = "Number of Lives Left is: " + sLives;
					DisplayAllOccurenceofGuessedLetter();
					RecPrompt();
			    })
		    } 
			  
		}
		RecPrompt();     	
   //}     
}

ProcessKeys();

