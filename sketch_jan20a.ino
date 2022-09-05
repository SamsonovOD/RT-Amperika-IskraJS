void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(A1, 'output');
  pinMode(A2, 'output');
  pinMode(A3, 'output');
  pinMode(A4, 'output');
  set(0, 1, 1, 1);
}
void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
    int in_data = Serial.parseInt();
    if (in_data == 1){
      if (digitalRead(A1) == 1){
        digitalWrite(A1, 0);
      } else {
        digitalWrite(A1, 1);
      }
    }
    else if (in_data == 2){
      if (digitalRead(A2) == 1){
        digitalWrite(A2, 0);
      } else {
        digitalWrite(A2, 1);
      }
    }
    else if (in_data == 3){
      if (digitalRead(A3) == 1){
        digitalWrite(A3, 0);
      } else {
        digitalWrite(A3, 1);
      }
    }
    else if (in_data == 4){
      if (digitalRead(A4) == 1){
        digitalWrite(A4, 0);
      } else {
        digitalWrite(A4, 1);
      }
    }
  }
}
void set(int T1, int T2, int T3, int T4){
  digitalWrite(A1, T1);
  digitalWrite(A2, T2);
  digitalWrite(A3, T3);
  digitalWrite(A4, T4);
  delay(100);
}
