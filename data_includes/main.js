PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff()
// Start typing your code here
PennController.AddHost("https://raw.githubusercontent.com/awpzs/VerbalComm/master/images/")

Sequence( "information", "identification", "instruction", "prac_1", "prac_2", "prac_end", "experiment", "questionnaire", "send", "final" )

newTrial( "information" ,
    newHtml("information.html")
        .print()
    ,
    newButton("Agree")
        .settings.center()
        .print()
        .wait()
)

newTrial( "identification" ,
    defaultText
        .print()
    ,
    newText("<p>Please fill in this short questionnaire before proceeding to the instructions.</p>")
    ,
    newText("<p>Are you a university student?</p>")
    ,
    newScale("uni", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newTextInput("university", "Name of university")
        .print()
    ,
    newText("<p>Have you been diagnosed with dyslexia?</p>")
    ,
    newScale("dyslexia", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>Are you a native British English speaker?</p>")
    ,
    newScale("native", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>Do both of your parents only speak British English to you at home?</p>")
    ,
    newScale("nativeParents", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>Please put your age and gender in the boxes below, then click on Start to proceed to the instructions.</p>")
    ,
    newTextInput("inputAge", "Age")
        .print()
    ,
    newTextInput("inputSex", "Gender")
        .print()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait()
    ,
    newVar("Age")
        .global()
        .set( getTextInput("inputAge") )
    ,
    newVar("Sex")
        .global()
        .set( getTextInput("inputSex") )
)
.log( "Age", getVar("Age"))
.log( "Sex", getVar("Sex"))
.log( "ParticipantID", PennController.GetURLParameter("id") );

newTrial( "instruction" ,
    newHtml("instruction_form", "instruction.html")
        .print()
    ,
    newButton("Proceed")
        .settings.center()
        .print()
        .wait()
)

newTrial( "prac_1" ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("The sentence below the picture introduces the characters/objects. Please read the sentence, and click on the sentence to proceed.")
        .settings.center()
        .print()
    ,
    newImage("one", "P3_1.jpg")
        .size(768,512)
        .print()
    ,
    newText("sentence", "The man above the sausage is on Number 3.")
        .settings.center()
        .bold()
        .print()
    ,
    newSelector()
        .add( getText("sentence") )
        .wait()
    ,
    clear()
    ,
    newText("Please describe the new location of the character/object in the red box, starting with <strong>Now</strong>. For example, you could say:")
        .settings.center()
        .print()
    ,
    newText("Now he is on Number 4./ Now the man is on Number 4.")
        .italic()
        .settings.center()
        .print()
    ,
    newImage("two", "P3_2.jpg")
        .size(768,512)
        .print()
    ,
    newTextInput("Response", "Now")
        .log("final")
    ,
    newButton("Proceed")
        .before( getTextInput("Response") )
        .settings.center()
        .print()
        .wait()
    ,
    newTimer(200)
        .start()
        .wait()
)
.log( "ParticipantID", PennController.GetURLParameter("id") );

newTrial( "prac_2" ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("There are more than one red box in the picture, which means that either object could move.")
        .settings.center()
        .print()
    ,
    newText("Please read the sentence, and click on the sentence to proceed.")
        .settings.center()
        .print()
    ,
    newImage("one", "P1_1.jpg")
        .size(768,512)
        .print()
    ,
    newText("sentence", "The skate next to the suitcase is on Number 1.")
        .settings.center()
        .bold()
        .print()
    ,
    newSelector()
        .add( getText("sentence") )
        .wait()
    ,
    clear()
    ,
    newText("Please describe the new location of the character/object in the red box, starting with <strong>Now</strong>. For example, you could say:")
        .settings.center()
        .print()
    ,
    newText("Now it is on Number 5./ Now the skate is on Number 5.")
        .italic()
        .settings.center()
        .print()
    ,
    newImage("two", "P1_2.jpg")
        .size(768,480)
        .print()
    ,
    newTextInput("Response", "Now")
        .log()
    ,
    newButton("Proceed")
        .before( getTextInput("Response") )
        .settings.center()
        .print()
        .wait()
    ,
    newTimer(200)
        .start()
        .wait()
)
.log( "ParticipantID", PennController.GetURLParameter("id") );

newTrial( "prac_end" ,
    defaultText
        .print()
    ,
    newText("<p>This is the end of the instructions. Please click on <strong>Start</strong> to start the experiment.</p>")
    ,
    newText("<p>No instructions or examples will be provided during the experiment.</p>")
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait()
)

Template(
    GetTable("fulldesign.csv")
            .setGroupColumn("List"), variable =>
    newTrial( "experiment" ,
        newTimer(200)
            .start()
            .wait()
        ,
        newImage("one", variable.FirstDisplay)
            .size(768,512)
            .print()
        ,
        newText("sentence", variable.Context)
            .settings.center()
            .bold()
            .print()
        ,
        newSelector()
            .add( getText("sentence") )
            .wait()
        ,
        clear()
        ,
        newImage("two", variable.SecondDisplay)
            .size(768,512)
            .print()
        ,
        newTextInput("Response", "Now")
            .log("final")
        ,
        newButton("Proceed")
            .before( getTextInput("Response") )
            .settings.center()
            .print()
            .wait()
        ,
        newTimer(200)
            .start()
            .wait()
  )
  .log( "ParticipantID", PennController.GetURLParameter("id") );
  .log( "List"   , variable.List   )
  .log( "Item"   , variable.Item   )
  .log( "Context"   , variable.Context   )
  .log( "Box"   , variable.Box   )
  .log( "Gender"   , variable.Gender   )
  )

newTrial( "questionnaire" ,
    newText("<p>Thank you very much! Please fill in this short questionnaire before finishing this experiment.</p>")
        .print()
    ,
    newTextInput("feedback", "What do you think this experiment is about?")
        .settings.log()
        .settings.lines(0)
        .settings.size(400, 200)
        .print()
    ,
    newButton("Proceed")
        .settings.center()
        .print()
        .wait()
)
.log( "ParticipantID", PennController.GetURLParameter("id") );

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you very much for your participation. Please click on the link below to validate your participation.</p><p><strong>Important: Validating your participation is a necessary step to grant you credits.</strong></p>")
        .print()
    ,
    newText("<p><a href='https://www.stir.ac.uk' href='_blank'>Click here to validate your participation</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
