
function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr =reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    if(str===reverse){
          return true ;
    }
    return false ;
}

function convertDateToStr(date){
    var dateStr = {day:'',month:'',year:''};
    if(date.day<10){
          dateStr.day='0'+date.day;
    }
    else{
          dateStr.day=date.day.toString();
    }
    if(date.month<10){
          dateStr.month='0'+date.month;
    }
    else{
          dateStr.month=date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFarmates(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy= dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return [ ddmmyyyyy, mmddyyyy , yyyymmdd , ddmmyy,mmddyy,yymmdd];
}


function ckeckPalindromeForAllDateForms(date){
    var listOfPaindromes=getAllDateFarmates(date);
    var flag =false;
    for (var i=0;i<listOfPaindromes.length;i++){
          if( isPalindrome(listOfPaindromes[i])){
        flag =true;
    break;
    }
}
    return flag;
}


function isLeapYear(year){
    if(year%400===0){
          return true;
    }
    if(year%100===0){
          return false;
    }
    if(year%4===0){
          return true;
    }
    return false;
}

function getNextDate(date){
    var day =date.day+1;
    var month = date.month;
    var year = date.year;

    var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2){
          if(isLeapYear(year)){
                if(day>29){
                      day=1;
                      month++;
                }
          }else{
                if(day>28){
                      day=1;
                      month++;
                }
          }
    }else{
          if(day>daysInMonth[month-1]){
                day=1;
                month++;
          }
    }
    if(month>12){
          month=1;
          year++;
    }
return{
    day:day,
    month:month,
    year:year
};
}


function getNextpalindromeDate(date){
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1){
          ctr++;
          var isPalindrome =ckeckPalindromeForAllDateForms(nextDate);
          if(isPalindrome){
                break;
          }
          nextDate=getNextDate(nextDate);
    }console.log(ctr);
    console.log(nextDate);
    return[ctr,nextDate]
}



function getPrevDate(date){
    var day =date.day-1;
    var month = date.month;
    var year = date.year;

    var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];

if(day===0){
    month--;

if(month === 0){
    month = 12;
    day = 31;
    year--;
}

    else if(month===2){
          if(isLeapYear(year)){
                      day=29;
                }
          else{
                      day=28;
                }
          }
    else{
        day=daysInMonth[month-1];
          }
    
      }
return{
    day:day,
    month:month,
    year:year
};
}


function getPrevpalindromeDate(date){
    var pctr=0;
    var prevDate=getPrevDate(date);
    while(1){
          pctr++;
          var isPalindrome =ckeckPalindromeForAllDateForms(prevDate);
          if(isPalindrome){
                break;
          }
          prevDate=getPrevDate(prevDate);
    }
    console.log(prevDate);
    console.log(pctr);
    return[pctr,prevDate]
}


var dateInPutRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');
// var processingMessege= document.querySelector('#processingMessage');

function clickHandler(e){
      
    
    var bdayStr =  dateInPutRef.value;
    if(bdayStr!==''){


      document.getElementById("processingMessage").style.display = "block";

      setTimeout(function () {
            // After the delay, hide the processing message
            document.getElementById("processingMessage").style.display = "none";
            
            // Display the output message
            var outputDiv = document.getElementById("outputMessage");
            outputDiv.innerHTML = "Processing complete!";
            outputDiv.style.display = "block";
        }, 1000); // 3000 milliseconds = 3 seconds





          var listOfDate=bdayStr.split('-');
          var date={
                day:Number(listOfDate[2]),
                month:Number(listOfDate[1]),
                year:Number(listOfDate[0])
          };

var isPalindrome = ckeckPalindromeForAllDateForms(date);
var [ctr,nextDate] = getNextpalindromeDate(date);
var [pctr,prevDate] = getPrevpalindromeDate(date);

setTimeout(function(){

      if(isPalindrome){
            resultRef.innerText='🎈 yay! your birthday is palindrome !! 🎈 '
        }
        else if(pctr>ctr ){
            // var [ctr,nextDate] = getNextpalindromeDate(date);
            resultRef.innerText=`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} . you missed it by ${ctr} days ! 😲`
        }else{
            // var [pctr,prevDate] = getNextpalindromeDate(date);
            resultRef.innerText=`The next palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year} . you missed it by ${pctr} days ! 😲`
        }


},2000);
    }else {
      var outputDiv = document.getElementById("outputMessage");
      outputDiv.innerHTML = "PLEASE ENTER THE DATE !";
      outputDiv.style.display = "block";
    }

    }


showBtnRef.addEventListener('click',clickHandler);
  