#include <Wire.h>
#include <ESP8266WiFi.h>
int pinobuzzer = D5;
int Mot = D8;
int led = D4;
int dormiu = 0;


WiFiClientSecure client;//Cria um cliente seguro (para ter acesso ao HTTPS)
String textFix = "GET /forms/d/e/1FAIpQLSeBIbA3aKwdje3NEYpWu1tO8LfYpBKeBtB8e4wXOCud3V5zKg/formResponse?ifq&entry.242071082=";
//String textFix1 = "GET /forms/d/e/1FAIpQLSeBIbA3aKwdje3NEYpWu1tO8LfYpBKeBtB8e4wXOCud3V5zKg/formResponse?ifq&entry.42854104=";
//Essa String sera uma auxiliar contendo o link utilizado pelo GET, para nao precisar ficar re-escrevendo toda hora

// MPU6050 Slave Device Address
const uint8_t MPU6050SlaveAddress = 0x68;

// Select SDA and SCL pins for I2C communication 
const uint8_t scl = D6;
const uint8_t sda = D7;

// sensitivity scale factor respective to full scale setting provided in datasheet 
const uint16_t AccelScaleFactor = 16384;
const uint16_t GyroScaleFactor = 131;

// MPU6050 few configuration register addresses
const uint8_t MPU6050_REGISTER_SMPLRT_DIV   =  0x19;
const uint8_t MPU6050_REGISTER_USER_CTRL    =  0x6A;
const uint8_t MPU6050_REGISTER_PWR_MGMT_1   =  0x6B;
const uint8_t MPU6050_REGISTER_PWR_MGMT_2   =  0x6C;
const uint8_t MPU6050_REGISTER_CONFIG       =  0x1A;
const uint8_t MPU6050_REGISTER_GYRO_CONFIG  =  0x1B;
const uint8_t MPU6050_REGISTER_ACCEL_CONFIG =  0x1C;
const uint8_t MPU6050_REGISTER_FIFO_EN      =  0x23;
const uint8_t MPU6050_REGISTER_INT_ENABLE   =  0x38;
const uint8_t MPU6050_REGISTER_ACCEL_XOUT_H =  0x3B;
const uint8_t MPU6050_REGISTER_SIGNAL_PATH_RESET  = 0x68;

int16_t AccelX, AccelY, AccelZ, Temperature, GyroX, GyroY, GyroZ;

void alerta(){
    digitalWrite(pinobuzzer, HIGH);
    digitalWrite(Mot, HIGH);
    digitalWrite(led, HIGH);
    dormiu = 1;
    //delay(100);
    }

void alerta2(){
    noTone(pinobuzzer);
    digitalWrite(Mot,LOW);
    digitalWrite(led, LOW);
    dormiu = 0;
    //delay(100);
    }

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);//Habilita o modo estaçao
  WiFi.begin("B3", "unisep350lab");//Conecta na rede 
  delay(2000);//Espera um tempo para se conectar no WiFi
  Wire.begin(sda, scl);
  MPU6050_Init();
  
  pinMode(pinobuzzer, OUTPUT);
  pinMode(Mot, OUTPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
   //Serial.begin(115200);//Inicia a comunicacao serial
}

void loop() {
  double Ax, Ay, Az, T, Gx, Gy, Gz;
  
  Read_RawValue(MPU6050SlaveAddress, MPU6050_REGISTER_ACCEL_XOUT_H);
  
  //divide each with their sensitivity scale factor
  Ax = (double)AccelX/AccelScaleFactor;
  Ay = (double)AccelY/AccelScaleFactor;
  Az = (double)AccelZ/AccelScaleFactor;
  T = (double)Temperature/340+36.53; //temperature formula
  Gx = (double)GyroX/GyroScaleFactor;
  Gy = (double)GyroY/GyroScaleFactor;
  Gz = (double)GyroZ/GyroScaleFactor;

  Serial.print("Ax: "); Serial.print(Ax);
  Serial.print(" Ay: "); Serial.print(Ay);
  Serial.print(" Az: "); Serial.print(Az);
  Serial.print(" Temperatura: "); Serial.print(T);
  Serial.print(" Gx: "); Serial.print(Gx);
  Serial.print(" Gy: "); Serial.print(Gy);
  Serial.print(" Gz: "); Serial.println(Gz);

    delay(500);

    
    
    if(Ay >= 0.27|| Ay <= -0.27){
     alerta();
    //delay(100);
    }else if(Ax >= 0.27 || Ax <= -0.27){
    alerta(); 
    }else{
    alerta2();
    }

    

    //delay(500);
    //int dormiu = 0;
    //if(){
    //digitalWrite(pinobuzzer, HIGH);
    //digitalWrite(Mot, HIGH);
    //digitalWrite(led, HIGH);
    //dormiu = 1;
    /*delay(2000);
    }else{
    noTone(pinobuzzer);
    digitalWrite(Mot,LOW);
    digitalWrite(led, LOW);
    }*/
  
  if (client.connect("docs.google.com", 443) == 1)//Tenta se conectar ao servidor do Google docs na porta 443 (HTTPS)
    {
        String temp = String(dormiu);
        String temp2 = String(T);
        String total = temp + temp2;
       // Serial.println(total);
        String toSend = textFix;//Atribuimos a String auxiliar na nova String que sera enviada
        toSend += (total);
        toSend += "&submit=Submit HTTP/1.1";//Completamos o metodo GET para nosso formulario
        client.println(toSend);//Enviamos o GET ao servidor
        client.println("Host: docs.google.com");//-
        client.println();     
        //client.println();
        
//        String toSend = textFix;//Atribuimos a String auxiliar na nova String que sera enviada
        //toSend += (T);
        /*toSend += "&submit=Submit HTTP/1.1";//Completamos o metodo GET para nosso formulario
        client.println(toSend);//Enviamos o GET ao servidor
        client.println("Host: docs.google.com");//-
        client.println();     
        //client.stop();*/
        client.stop();
        
        Serial.println("Dados enviados.");//Mostra no monitor que foi enviado
    }
    else
    {
        Serial.println("Erro ao se conectar");//Se nao for possivel conectar no servidor, ira avisar no monitor.
    }
    delay(500);
}


void I2C_Write(uint8_t deviceAddress, uint8_t regAddress, uint8_t data){
  Wire.beginTransmission(deviceAddress);
  Wire.write(regAddress);
  Wire.write(data);
  Wire.endTransmission();
}

// read all 14 register
void Read_RawValue(uint8_t deviceAddress, uint8_t regAddress){
  Wire.beginTransmission(deviceAddress);
  Wire.write(regAddress);
  Wire.endTransmission();
  Wire.requestFrom(deviceAddress, (uint8_t)14);
  AccelX = (((int16_t)Wire.read()<<8) | Wire.read());
  AccelY = (((int16_t)Wire.read()<<8) | Wire.read());
  AccelZ = (((int16_t)Wire.read()<<8) | Wire.read());
  Temperature = (((int16_t)Wire.read()<<8) | Wire.read());
  GyroX = (((int16_t)Wire.read()<<8) | Wire.read());
  GyroY = (((int16_t)Wire.read()<<8) | Wire.read());
  GyroZ = (((int16_t)Wire.read()<<8) | Wire.read());
}

//configure MPU6050
void MPU6050_Init(){
  delay(150);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_SMPLRT_DIV, 0x07);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_PWR_MGMT_1, 0x01);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_PWR_MGMT_2, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_CONFIG, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_GYRO_CONFIG, 0x00);//set +/-250 degree/second full scale
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_ACCEL_CONFIG, 0x00);// set +/- 2g full scale
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_FIFO_EN, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_INT_ENABLE, 0x01);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_SIGNAL_PATH_RESET, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_USER_CTRL, 0x00);
}
