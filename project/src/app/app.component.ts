import { Router } from '@angular/router';
import { CommonService } from './common.service';
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from './encryption.service';
import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import { ContactService } from './contact.service';
import { Validators } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthserviceService } from './authservice.service';
//import { Add2cartComponent } from './add2cart/add2cart.component';
//import { ConsoleReporter } from 'jasmine';
declare var config: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
 
  
  pricesdata = {'wasshirt':0,'wastie':0,'wasblazer':0,'waspant':0,'wasjeans':0,'wassuit':0,'ironshirt':0,'irontie':0,'ironblazer':0,'ironpant':0,'ironjeans':0,
  'ironsuit':0,'waishi':0,'waitie':0,'waiblazer':0,'waipant':0,'waijeans':0,'waisuits':0,'dryshirts':0,'drytie':0,'dryblazer':0,'drypant':0,'dryjeans':0,'drysuit':0,'status':'Save'};
  //totalData: any;
  //getlen: any = 0;
  public static totalData: any = 0;
  public static getlen: any;
  //private static newService: CommonService;
 // private static newService: CommonService;
  [x: string]: any;
  title = 'project'
  errorMessage: any;
  FirstName_laun:any;
  logincounting = 0;
  LastName_laun:any;
  comname:any;
  pnumber:any;
  Lcount= 0;
  Cuslogin = 0;
  Laucount =0;
  Ccount = 0;
  email_cus: any;
  email_forgot:any;
  email_laundry:any;
  secques_laun:any;
  totaldata1:any;
 // totalData:any;
  secques:any;
  password:any;
  laundry:boolean = false;
  customer:boolean = false;
  home:boolean = true;
  conpassword:any;
  secans_cus:any;
  Repdata1: any;
  conversionDecryptOutput: any;
  conversionEncryptOutput: any;
  encryptSecretKey!: string;
  laundrycounting = 0;
  get:boolean = false;
  customercounting = 0;
  value:any
  private subscription!: Subscription;
	@Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();

	@Input() SearchDate: moment.Moment = moment();
	@Input() ElapsTime: number = 3;

	searchEndDate: moment.Moment;
	remainingTime: any;
	minutes: any;
	seconds: any;
 // backendService:any;
	everySecond: Observable<number> = timer(0, 1000);
 // private newone!: CommonService;
  

  constructor(private contactService:ContactService,private newService: CommonService,private router:Router,private auths:AuthserviceService,private enService: EncryptionService,private ref: ChangeDetectorRef){
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
   // this.newService = newService;
   }
  getlen1:any = 0;
  Repdata: any;
  sendemail:any;
  valbutton = 'Save';
  OTP : any;
  timerOn : boolean = true;
  test : boolean | undefined;
  show:boolean = true;
  unshow:boolean = false;
  

  ngOnInit() {
    console.log(this.newService.getCartItems());
    //this.getlen1 = 0;
    this.totalData = this.newService.getCartItems();
    this.getlen = this.totalData.length;
  
    this.subscription = this.everySecond.subscribe((seconds) => {
			var currentTime: moment.Moment = moment();
			this.remainingTime = this.searchEndDate.diff(currentTime)
			this.remainingTime = this.remainingTime / 1000;

			if (this.remainingTime <= 0) {
				this.SearchDate = moment();
				this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
				this.TimerExpired.emit();
        this.unshow = false;
        this.show = true;
			}
			else {
				this.minutes = Math.floor(this.remainingTime / 60);
				this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
			}
			this.ref.markForCheck();
		})
    //this.gettingcart();
	
    this.userRegistrationForm = this.fb.group({
      name: ["", Validators.required],
      email: ["",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
    });
    //this.gettingcart();
    
  }
  

  useEmail(OTP:any,email:any){
    let user = {
      name: "Hello",
      email:email,
      message: OTP
    }
   
     this.contactService.sendEmailVolunteers("http://localhost:3000/sendmailv", user).subscribe(
       (data: any) => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  details are sent successfully, the message id is ${res.messageId}`
        );
      },
       
    );
  }

  get staticUrlArray() {
    return AppComponent.getlen;
  }

  public static gettingcart(_newService:CommonService,_getlen1:any){
    console.log(_newService.getCartItems());
    AppComponent.totalData = _newService.getCartItems();
    console.log(AppComponent.totalData);
    AppComponent.getlen = _newService.getCartItems().length;
   // getlen = _getlen1;
    //public static int getlen1 = this.totalData.length;
    //return this.totalData.length;
  }
  
  
  isValidEmail(session:any){
    console.log(session);
    this.OTP = this.generateOTP();
    this.sendemail = session.email_forgot;
    this.newService.isPresentLaundry(session.email_forgot)
      .subscribe((data:any) => {
        alert("We have sent you the mail please check it out");
        console.log(data);
        this.wholeObject = data;
        this.Lcount= this.Lcount + 1;
        this.show = false;
        this.unshow = true;
        this.useEmail(this.OTP,session.email_forgot);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
    this.newService.isPresentCustomer(session.email_forgot)
        .subscribe((data:any) => {
          alert("We have sent you the mail please check it out");
          console.log(data);
          this.wholeObject = data;
          this.show = false;
          this.Ccount = this.Ccount + 1 ;
          this.unshow = true;
          this.useEmail(this.OTP,session.email_forgot);
          this.ngOnInit();
        }
          , (error: any) => this.errorMessage = error)
  }


  check(otp:any){
    console.log(this.OTP);
    console.log(otp);
    if(this.OTP == otp){
      alert("good");
      this.unshow = false;
      this.conshow = true;

    }
    else{
      alert("no");
    }
  }
  public static closinglen(){
    AppComponent.getlen = 0;
    AppComponent.totalData = [];
  }

  selectFile(event:any){
    var files = event.target.files;
    var file = require("../assets/img/gallery/laundry.jpg") ;


  if (this.files && this.file) {
      var reader = new FileReader();

      reader.onload =this.handleFile.bind(this);

      reader.readAsBinaryString(file);
  }
}



handleFile(event:any) {
   var binaryString = event.target.result;
   this.base64textString= btoa(binaryString);
   console.log(btoa(binaryString));
  }



  onSave(user: any){
   // user.secques = CryptoJS.AES.encrypt(this.plainText, user.secques).toString();
    //user.secans = CryptoJS.AES.encrypt(this.plainText, user.secans).toString();
    user.mode = this.valbutton;
    user.LaundryPic = this.base64textString;
    user.status = "InProcess";
    console.log(user);
    this.newService.saveUser(user)
      .subscribe((data:any) => {
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
        this.newService.savePrices(this.pricesdata)
        .subscribe((data:any) => {
          alert(data.data);
          this.ngOnInit();
        }
          , (error: any) => this.errorMessage = error)

  }
  
  onSave_customer(user1: any){
   // user1.secques = CryptoJS.AES.encrypt(this.plainText, user1.secques).toString();
    //user1.secans = CryptoJS.AES.encrypt(this.plainText, user1.secans).toString();
    //user1.password = CryptoJS.AES.encrypt(this.plainText, user1.password).toString();
   
    //this.decrypted= this.get('123456$#@$^@1ERF',user1.password);
    //console.log(this.decrypted);
    user1.mode = this.valbutton;
   // console.log(user1);
    if (this.password == this.conpassword){
     // user1.delete(user1.conpassword)
      this.newService.saveUser_customer(user1)
      .subscribe((data:any) => {
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
      
  }

  else {
    alert('Invalid');
  }

}


forgot(session:any){
  if (session.chpassword == session.conchpassword){
    if (this.Lcount > 0){
      this.wholeObject.data.password = session.chpassword;
      this.newService.UpdateUser(this.wholeObject.data)
      .subscribe((data: { data: any; }) => {
      alert(data.data);
      //this.router.navigate(["tutorProfile"]);
      this.ngOnInit();
    }
      , (error: any) => this.errorMessage = error)
  }
    else {
      this.wholeObject.data.password_cus = session.chpassword;
    this.newService.UpdateUser_Customer(this.wholeObject.data)
    .subscribe((data: { data: any; }) => {
    alert(data.data);
    //this.router.navigate(["tutorProfile"]);
    this.ngOnInit();
  }
    , (error: any) => this.errorMessage = error)
}}
  else{
    alert("Invalid")
  }
}

generateOTP() {
  var digits = '0123456789';
  for (let i = 0; i < 5; i++ ) {
      this.OTP += digits[Math.floor(Math.random() * 10)];
  }
  return this.OTP;
}



login(user_login:any){
  this.newService.login(user_login)
    .subscribe((data: any) => {
   console.log(data.data[0]);
   if (typeof(data.data[0]) !== "undefined"){
     //this.laundrycounting = this.laundrycounting + 1;
     this.newService.setUserId(data.data[0]);
    // this.newService.sendDetails(data.data);
     this.laundry = true;
     this.home= false;
     console.log(this.laundry);
     console.log(this.home);
     this.auths.settoken();
     this.router.navigate(["Customer"]);
   
   }
  }
    , (error: any) => this.errorMessage = error)

  this.newService.loginCustomer(user_login)
    .subscribe((data: any) => {
    console.log(data.data[0]);
    if (typeof(data.data[0]) !== "undefined"){
      //this.customercounting = this.customercounting + 1;
     this.newService.setUserId(data.data[0]);
     data.data[0].date = new Date();
     this.newService.UpdateUser_Customer(data.data[0])
      .subscribe((data:any) => {
        this.customer = true;
        this.home= false;
        this.newService.sendlaundryname(data.data[0].comname);
        this.auths.settoken();

       // this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)

     //this.newService.sendDetails(data.data);
     this.router.navigate(["Laundry"]);
    }
  }
    , (error: any) => this.errorMessage = error)
    
   /**  if (this.laundrycounting > 1){
      this.router.navigate(["Customer"]);
    }
    else if(this.customercounting > 1){
      this.router.navigate(["Laundry"])
    }
    else{
      alert("Invalid")
    }**/

}
addingcart(){
  this.router.navigate(['Laundry']);
}
Profile(){
  this.router.navigate(['Update']);
}
change(){
  this.router.navigate(['change']);
}
Orders(){
  this.router.navigate(['Customer-list']);
}
Prices(){
  this.router.navigate(['Customer']);
}
logout(){
  this.home = true;
  this.laundry = false;
  this.customer = false;
  this.router.navigate(['']);
}
Myorders(){
  this.router.navigate(['yourorders']);

}
removing(data:any){
  const index: number = this.totaldata1.indexOf(data);
  this.totaldata1.splice(index, 1);
  AppComponent.getlen = this.totaldata1.length;
  if (AppComponent.getlen == 0){
    this.get = true;
  }
  else{
    this.get = false;
  }

}
onIncrement(data:any): void {
  const index: number = this.totaldata1.indexOf(data);
  data[3] = Number(this.totaldata1[index][3]) + 1;
  console.log(this.totaldata1);

  }
 
  onDecrement(data:any): void {
    const index: number = this.totaldata1.indexOf(data);
    if (data[3] > 0) {
      data[3] = Number(this.totaldata1[index][3]) - 1;
      console.log(this.totaldata1);
    }
    if (data[3] === 0){
      this.removing(data);
    }
  }
  movetopayment(){
    this.newService.sendCartItems(this.totaldata1);
    this.router.navigate(['Payment']);
  }
  checkout(){
    //this.gettingcart();
    console.log(AppComponent.totalData);
    console.log(this.getlen1);
    this.getlen1 = AppComponent.totalData.length;
    this.totaldata1 = AppComponent.totalData;
    if (this.getlen1 == 0){
      this.get = true;
  }
    else{
      this.get = false;
  }
  }
     


}

 

