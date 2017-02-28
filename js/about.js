$(document).ready(function(){
  var coding = $("#coding");
  var text = coding.text();
  coding.text("");
  
  var i = 0;
  var html = "";
  var a = null;
  var interval = setInterval(function(){
    var char = "";
    if(text.split("")[i] != "*" && 
       text.split("")[i] != null &&
       text.split("")[i] != undefined)
      char = (text.split("")[i] != "_") ? text.split("")[i] : "</br>";
    
    coding.html(html + char);
    html+=char;
    i++;
    
    if(text.split("")[i] == "*")
      a++;
    if(a != null) $(".objro:eq("+a+")").css("display", "block");
    
    
    if(i == text.split("").length)
    {
      tellusSoething();
      clearInterval(interval);
    }
    
   
  }, 30);
  
  
  var whatDoesHeOrSheSay = "01001001 01001100 01001111 01010110 01000101 01011001 01001111 01010101 01010111 01000001 01001110 01001000 01010101 01001001 01000011 01010101 01001001";
  var lgh = whatDoesHeOrSheSay.split("").length;
  var bitInt = 0;
  function tellusSoething()
  {
    
    $("#HeorSheSay").text($("#HeorSheSay").text() + whatDoesHeOrSheSay.split("")[bitInt]);
    bitInt++; 
    $(".mouth").css("display", ((bitInt%8 && $(".mouth").css("display") == "none") ? "block" : "none"));
    
    $(".codingBot").css("display", "block");
    if(bitInt < lgh)
      setTimeout(function(){ tellusSoething(); }, 10);
    else{
      $(".mouth").css("display", "block");
    }
  }
});