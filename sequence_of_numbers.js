/* --------------------------------------------------------------------------
Javascript Code to Display a Sequence of Outcomes on Screen
Author: Jana B. Jarecki
------------------------------------------------------------------------*/


/* --------------------------------------------------------------------------
How to use this code in Qualtrics? Three steps:

1. Make a new text-only question in Qualtrics

2. Copy-paste lines 14 - 18 into Rich Text Content Editor > Code Editor:

    <div style="text-align: center;"><br />
    Press space to see the next number<br />
    <br />
    <br />
    <span style="font-size:26px;"><span id="number">Number</span></span></div>

3. Change lines 39 - 57 in the javascript code below as needed and
   copy-paste the code below into the javascript section in Qualtrics.
   Where is this javascript section? see:
   https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/

   The below code goes after the opening curly bracket here:
   Qualtrics.SurveyEngine.addOnReady(function() 
   {
      HERE GOES THE CODE BELOW, RATHER THAN THIS LINE
    }
------------------------------------------------------------------------*/
  


  // --------------------------------------------------------------------------
  // CHANGE THESE VALUES
  //
  // The numbers that you want to show, comma-separated
  var outcomes = [1, 20, 3, 20, 300, 56, 78];

  // Do you want your numbers to be shown in a random order?
  //   * If yes, shuffle the order of the outcomes for each participant
  //   * If no, delete this line or comment it out
  outcomes = shuffle(outcomes);

  // How much delay between the key press and the appearance of the next number? (in milliseconds) (optional)
  delay_in_ms = 333;

  // Do you want the order of the outcomes to be saved? (optional)
  //  * If no, don't change.
  //  * If yes, define an embedded data field, and supply it as a string
  variable_name = null // your embedded data field may be: "outcome_order"

  // Which key should the participant press? (optional)
  // 32 = space key
  var key_code = 32; // change if you want a different key, google key codes
  // --------------------------------------------------------------------------



  // --------------------------------------------------------------------------
  // DO NOT CHANGE THESE LINES OF CODE UNLESS YOU KNOW WHAT YOU ARE DOING
  // hide the next button
  jQuery("#NextButton").hide();
  var count = 0,
      num_outcomes = outcomes.size();
  // save the order of the numbers
  if (variable_name != null) {
      Qualtrics.SurveyEngine.setEmbeddedData(variable_name,outcomes.join(" "));
  }

  // Function: Shuffles the elements of the array (a)
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  
  // Function: Displays the ith number / the ith outcome
  function show_number_after(delay) {
    jQuery("#number").css("visibility","hidden");
    jQuery("#number").html(outcomes[count]);
    setTimeout(function() {
      jQuery("#number").css("visibility","visible");
    },
    delay);
  };

  // Now we execute the code showing the numbers
  // We observe for key press events
  var that = this;
  Event.observe(document, "keydown", function(e) {
   if (e.keyCode == key_code) {
    if (count >= num_outcomes) {
        that.clickNextButton();
      } else {
        show_number_after(delay_in_ms);
        count += 1;  
      }   
    }
  })