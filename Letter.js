var Letter = function(charName)
{
	this.AlphaChar = charName;
	this.isGuessed = false;
	//search for the entered letter in the m/c selected word and fill array at all positions where the letter occurs
   
   this.CheckAlphabetExists = function(StrSub)
   {
      if(this.AlphaChar == StrSub)
      {
         this.isGuessed = true;
         return this.AlphaChar;         
      }
      else
      {
         this.isGuessed = false;         
         return "-";         
      }   
   }
   
   this.WasLetterGuessed = function(StrSub)
   {
      if(this.AlphaChar == StrSub)
      {
         this.isGuessed = true;
      }
      else
      {
         this.isGuessed = false;
      }   

   }
};

module.exports = Letter;