var Letter = require("./Letter");

var Word = function(StrWord)
{
   var LetterArr = [];
   var sWord = "";
   sWord = StrWord;
   //loop through each char in the passed word and create a array of Letter objects
   //for(var i = 0; i < SelectedWord.length; i++)
   for(var i = 0; i < sWord.length; i++)
   {   
      
      var newLet = new Letter(StrWord.charAt(i));
      //console.log()
      LetterArr.push(newLet);
   }   
   
   this.CheckGuessLetterExists = function(charName)
   {
   	   var GuessWord = "";
         //form the guessword as a mix of "-" or "letters" based onmatch with computer word
   	   for(var i = 0; i < LetterArr.length; i++)
   	   {
   	   	   var TempLet = LetterArr[i];
   	   	   GuessWord = GuessWord + TempLet.CheckAlphabetExists(charName);   	   	   	

   	   }
         //console.log("The current guessword is:" + GuessWord);
         return GuessWord;	
   };   
};

module.exports = Word;