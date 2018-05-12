var terminal;

$( document ).ready(function() {
  console.log( "Ready!" );

  terminal = new Terminal();
  $("#terminalJS").append(terminal.html);

  startInput(true);

  $("#wrapper").on("click", function() {
    $("#terminalInput").focus();
  })

});

function startInput(isFirstInput) {
  var text = "";
  if(isFirstInput)
    text = "Ready .";

  terminal.input(text, processInput);
}

function processInput(data) {

  if(data.toUpperCase() === "CLEAR"){
    terminal.clear();
    startInput(true);
    return;
  }

  $.post({
    type: "POST",
    url: "/input",
    data: { cmd: data },
    success: showResult,
    dataType: "json"
  })
    .fail(function() {
      terminal.print("?SYNTAX ERROR");
      terminal.beep();
    })
    .always( function()  {
      startInput();
    });
}

function showResult(result) {

  console.info(result);

  if(result.success !== true) {
    terminal.print("?SYNTAX ERROR");
    terminal.beep();
  }


  terminal.print(result.data);
}