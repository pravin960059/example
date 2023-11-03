from twilio.rest import Client
import os
import random
def sendMessage(message_details):
    global new_otp
    new_otp = new_otp = random.randint(100000,999999)
    __account_sid = os.environ.get("twilio_account_sid")
    __auth_token = os.environ.get("twilio_auth_token")
    client = Client(__account_sid, __auth_token)
    
    whatsAppfrom = os.environ.get("whatsapp_from")

    to = message_details.get("to")
    body = "Dear User,"+"\n"+"\n"+"your OTP is "+str(new_otp)+"."
    media_url = message_details.get("media_url")
    has_attachment = message_details.get("has_attachment")
    print("world")
    print(new_otp)
    try:
        if not to.startswith("+"):
            to = "+91" + to

        message = None
        if has_attachment:
            message = client.messages.create(
                from_ = f'whatsapp:{whatsAppfrom}',
                body = body,
                to = f'whatsapp:{to}',
                media_url = media_url,
            )
            print(1)
        else:
            message = client.messages.create(
                from_ = f'whatsapp:{whatsAppfrom}',
                body = body,
                to = f'whatsapp:{to}',   
            )
            print(2)
        print('hello')
        return {
            "status": 200,
            "message": "OTP sent successfully"
        }
    
    except Exception as e:
        print(e)
        return {
            "status": 500,
            "message": "internal server error"
        }
def verify_otp(received_otp: dict):
    try:
        received_OTP =  received_otp.get("received_otp")
        received_OTP=int(received_OTP)

        if received_OTP == new_otp:
            print("verified")
            return {
            "status":"OTP is verified",
            "Message":"Verified Successfully"
            }
        else:
            return {
            "status":"OTP Does not match",
            "Message":"Verified Failed"
        }
    except Exception as e:
        print("Error verifying:", str(e))
        return {
        "status": "error",
        "message": f"Error sending email. Reason: {str(e)}"
    }
def sendconfirmmessage(message_details):
    __account_sid = os.environ.get("twilio_account_sid")
    __auth_token = os.environ.get("twilio_auth_token")
    client = Client(__account_sid, __auth_token)
    
    whatsAppfrom = os.environ.get("whatsapp_from")

    to = message_details.get("to")
    body = "Dear User,thanks for joining our website."
    media_url = message_details.get("media_url")
    has_attachment = message_details.get("has_attachment")

    try:
        if not to.startswith("+"):
            to = "+91" + to

        message = None
        if has_attachment:
            message = client.messages.create(
                from_ = f'whatsapp:{whatsAppfrom}',
                body = body,
                to = f'whatsapp:{to}',
                media_url = media_url,
            )
            print(1)
        else:
            message = client.messages.create(
                from_ = f'whatsapp:{whatsAppfrom}',
                body = body,
                to = f'whatsapp:{to}',   
            )
            
        print('hello')
        return {
            "status": 200,
            "message": "OTP sent successfully"
        }
    
    except Exception as e:
        print(e)
        return {
            "status": 500,
            "message": "internal server error"
        }