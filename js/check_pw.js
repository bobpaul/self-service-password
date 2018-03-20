// check_pw.js is based off of passchk.js
// passchk.js is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation; either version 3 of the License, or (at your
// option) any later version.
//
// passchk.js is distributed in the hope that it will be useful but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// The passchk.js archive has a copy of the GNU General Public License,
// but if you did not get it, see <http://www.gnu.org/licenses/>
//
// passchk.js is available from http://rumkin.com/tools/password/passchk.php
//
// Javascript functions for the password checker form

function Set_Text(s)
{
   var e;
   
   if (! document.getElementById)
   {
      return;
   }
   
   e = document.getElementById('passchk_result');
   if (! e)
   {
      return;
   }
   
   if (e.innerHTML == s)
   {
      return;
   }
   
   e.innerHTML = s;
}

function Set_ConfirmText(s)
{
   var e;
   
   if (! document.getElementById)
   {
      return;
   }
   
   e = document.getElementById('confirm_result');
   if (! e)
   {
      return;
   }
   
   if (e.innerHTML == s)
   {
      return;
   }
   
   e.innerHTML = s;
}

function hideButton()
{
   document.getElementById("submit_button").style.visibility='hidden';
}

function showButton()
{
   document.getElementById("submit_button").style.visibility='visible';
}

function comparePasswords()
{
   var newpass = document.passchk_form.newpassword.value;
   var confirmpass = document.passchk_form.confirmpassword.value;

   if(confirmpass.length != 0) {
      if (newpass.localeCompare(confirmpass) == 0)
      {
         Set_ConfirmText("Passwords match.");
      }
      else
      {
         Set_ConfirmText("Passwords do not match.");
      }
   }
   else
   {
      Set_ConfirmText("");
   }

   window.setTimeout('comparePasswords();', 200);
}

function check_Password()
{
   var passwd = document.passchk_form.newpassword.value;

   if(passwd.length != 0)
   {
      var result = zxcvbn(passwd);

      if(result.score == 0)
      {
	 Set_Text("<b>Strength:  <font color=red>Very Weak</font></b>");
         hideButton();
      }
      else if(result.score == 1)
      {
         Set_Text("<b>Strength:</b>  <font color=red>Weak</font>");
         hideButton();
      }
      else if(result.score == 2)
      {
         Set_Text("<b>Strength:</b>  <font color=brown>Mediocre</font>");
         showButton();
      }
      else if(result.score == 3)
      {
         Set_Text("<b>Strength:</b>  <font color=green>Strong</font>");
         showButton();
      }
      else if(result.score == 4)
      {
         Set_Text("<b>Strength:</b>  <font color=blue>Very Strong</font>");
         showButton();
      }
   }
   else if(passwd.length == 0)
   {
      Set_Text("");
   }

   window.setTimeout('check_Password()', 200);
}

window.setTimeout('check_Password()', 100);
window.setTimeout('comparePasswords();', 100);
