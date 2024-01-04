function Sendmail(){
  document.getElementById('btn').style.backgroundColor="gray"
  document.getElementById('phone-error').innerHTML = "" 
  document.getElementById('name-error').innerHTML = ""  
  document.getElementById('email-error').innerHTML = "" 
  document.getElementById('message-error').innerHTML = ""  
  document.getElementById('subject-error').innerHTML = "" 
  document.getElementById('sent_message').innerHTML = ""        
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  const name = document.getElementById('name').value
  const subject = document.getElementById('subject').value
  const message = document.getElementById('message').value
  const valid = Validation(email,name,phone,subject,message)
  if (valid == true){
    sendEmail(email, name, phone, subject, message)
  }else{
    document.getElementById('btn').style.backgroundColor="#59b256"
    return false
  }
}
 
  function Validation(email, name, phone, subject, message){
    const email_error =  ValidateEmail(email)
    const name_error = ValidateName(name)
    const phone_error = ValidatePhone(phone)
    const subject_error = ValidateSubject(subject)
    const message_error = ValidateMessage(message)
    console.log(email_error,name_error,phone_error,subject_error,message_error)
    if (email_error == true && name_error == true && phone_error == true && subject_error == true && message_error == true){
      return true
    } else {
      return false
    }
    }

 function ValidateEmail(email){
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (email != ""){
    if (email.match(mailformat)){
      return true
    } else {
      document.getElementById('email-error').innerHTML = "Invalid email!"
      return false
    }
  }else{
    document.getElementById('email-error').innerHTML = "Email field is required!"
    return false
  }
 }   

 function ValidateName(name){
  const nameformat = /^[A-Za-z ,.'-]+$/

  if (name != ""){
    if (name.match(nameformat)){
      return true
    } else {
      document.getElementById('name-error').innerHTML = "Your name should be valid string!"
      return false
    }
  }else{
    document.getElementById('name-error').innerHTML = "Name field is required!"
    return false
  }
 }

 function ValidatePhone(phone){
  const phoneformat = /^[0-9]+$/

  if (phone != ""){
    if (phone.match(phoneformat)){
      return true
    } else {
      document.getElementById('phone-error').innerHTML = "Phone number should be numeric!"
      return false
    }
  }else{
    document.getElementById('phone-error').innerHTML = "Phone field is required!"   
    return false
  }
 }

 function ValidateSubject(subject){
  if (subject != ""){
    return true
   } else {
    document.getElementById('subject-error').innerHTML = "Subject field is required!"
    return false
  }
 }

 function ValidateMessage(message){
  if (message != ""){
    return true
  } else {
   document.getElementById('message-error').innerHTML = "Message field is required!"
   return false
 }
 }

  

function sendEmail(email, name, phone, subject, message) {
  document.getElementById('btn').disabled=true
  // document.getElementById('loader').style.visibility = 'visible'
	Email.send({
	Host: "smtp.elasticemail.com",
	Username : 'lamichhanedinesh.com.np@gmail.com',
	Password : '87A0A98224F28C3414CBFD6D32E93B4104D2',
	To : 'lamichhanedinesh.com.np@gmail.com',
	From : 'lamichhanedinesh.com.np@gmail.com',
	Subject : subject,
	Body : "From:"+name+'<br>'+"Phone No:"+phone+'<br>'+"Email:"+email+'<br>'+message,
	}).then(
		message => {
      alert(message)
   document.getElementById('email').value = ""
   document.getElementById('phone').value = ""
   document.getElementById('name').value = ""
   document.getElementById('subject').value = ""
   document.getElementById('message').value = ""
   document.getElementById('sent_message').innerHTML = 'Message sent successfully!'
   document.getElementById('btn').style.backgroundColor="#59b256"
   document.getElementById('btn').disabled=false
  //  document.getElementById('loader').style.visibility = 'hidden'
    }
	);
}


window.onload = () => {
  document.getElementById('date').innerHTML = new Date().getFullYear()
}
