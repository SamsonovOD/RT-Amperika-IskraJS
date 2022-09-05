function count(){
  var counter = 0;

  setWatch(function(e) {
    if (digitalRead('LED1') == 0) {
      console.log('LED ON');
      digitalWrite('LED1', 1);
      counter++;
      //console.log("Light was switched on "+counter+" times");
    } else {
      console.log('LED OFF');
      digitalWrite('LED1', 0);
    }
  }, BTN1, {
    repeat: true,
    edge: 'rising',
    debounce: 10
  });
}

function morse(){
  function decode(msg){
    var temp = msg.split("_");
    var output = "";
    temp.forEach(function(item, index, array) {
      switch(item){
        case "*-":
          output += "A";
          break;
        case "-***":
          output += "B";
          break;
        case "-*-*":
          output += "C";
          break;
        case "*--":
          output += "D";
          break;
        case "*":
          output += "E";
          break;
        case "**-*":
          output += "F";
          break;
        case "--*":
          output += "G";
          break;
        case "****":
          output += "H";
          break;
        case "**":
          output += "I";
          break;
        case "*---":
          output += "J";
          break;
        case "-*-":
          output += "K";
          break;
        case "*-**":
          output += "L";
          break;
        case "--":
          output += "M";
          break;
        case "-*":
          output += "N";
          break;
        case "---":
          output += "O";
          break;
        case "*--*":
          output += "P";
          break;
        case "--*-":
          output += "Q";
          break;
        case "*-*":
          output += "R";
          break;
        case "***":
          output += "S";
          break;
        case "-":
          output += "T";
          break;
        case "**-":
          output += "U";
          break;
        case "***-":
          output += "V";
          break;
        case "*--":
          output += "W";
          break;
        case "-**-":
          output += "X";
          break;
        case "-*--":
          output += "Y";
          break;
        case "--**":
          output += "Z";
          break;
        case "*----":
          output += "1";
          break;
        case "**---":
          output += "2";
          break;
        case "***--":
          output += "3";
          break;
        case "****-":
          output += "4";
          break;
        case "*****":
          output += "5";
          break;
        case "-****":
          output += "6";
          break;
        case "--***":
          output += "7";
          break;
        case "---**":
          output += "8";
          break;
        case "----*":
          output += "9";
          break;
        case "-----":
          output += "0";
          break;
      }
    });
    console.log("Decode: "+output);
  }

  setWatch(function(e) {
    console.log("Morse start.");
    while(1){
      var msg = "_";
      var timer = 0;
      var idle = 0;
      var timeflag = 0;
      while (timer < 6000){
        timer++;
        idle++;
        if (digitalRead('BTN1') == 1){
          digitalWrite('LED1', 1);
          timeflag = 0;
          timer = 0;
          idle = 0;
          var hold = 0;
          while (digitalRead('BTN1') == 1){
            hold++;
          }
          if (hold > 1500) {
            msg += "-";
            console.log("MSG: "+msg);
            decode(msg);
            hold = 0;
          } else {
            msg += "*";
            console.log("MSG: "+msg);
            decode(msg);
            hold = 0;
          }
        }
        digitalWrite('LED1', 0);
        if (idle > 1000 && timeflag == 0){
          timeflag = 1;
          idle = 0;
          msg += "_";
          console.log("MSG: "+msg);
          decode(msg);
        }
      }
    }
  }, BTN1, {
    repeat: true,
    edge: 'rising',
    debounce: 10
  });
}

function wait(ms){
 var start = new Date().getTime();
 var end = start;
 while(end < start + ms) {
   end = new Date().getTime();
  }
}

function set(T1, T2, T3, T4){
  digitalWrite('LED1', 1);
  digitalWrite(A1, T1);
  digitalWrite(A2, T2);
  digitalWrite(A3, T3);
  digitalWrite(A4, T4);
  console.log("Relay", digitalRead(A1), digitalRead(A2), digitalRead(A3), digitalRead(A4));
  wait(500);
  digitalWrite('LED1', 0);
}

function relay(){
  pinMode(A1, 'output');
  pinMode(A2, 'output');
  pinMode(A3, 'output');
  pinMode(A4, 'output');
  set(0, 0, 0, 0);
  set(0, 1, 1, 1);
  set(0, 0, 1, 1);
  set(0, 0, 0, 1);
  set(0, 0, 0, 0);
  set(1, 0, 0, 0);
  set(1, 1, 0, 0);
  set(1, 1, 1, 0);
  set(1, 1, 1, 1);
  set(0, 1, 1, 1);

  var turn = 1;
  setWatch(function() {
    if (turn == 1 && digitalRead(A1) == 0){
      turn = 0;
      set(1, 0, 1, 1);
    } else if (turn == 1 && digitalRead(A2) == 0){
      turn = 0;
      set(1, 1, 0, 1);
    } else if (turn == 1 && digitalRead(A3) == 0){
      turn = 0;
      set(1, 1, 1, 0);
    } else if (turn == 1 && digitalRead(A4) == 0){
      turn = 0;
      set(0, 1, 1, 1);
    }
    turn = 1;
  }, BTN1, {
    repeat: true,
    edge: 'rising',
    debounce: 10
  });
}

//count();
//morse();
relay();