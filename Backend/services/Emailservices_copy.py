from dotenv import load_dotenv
load_dotenv()

import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import os
import io

# SMTP server settings
smtp_server = os.environ.get("SES_HOST_ADDRESS")
smtp_port = os.environ.get("SMTP_PORT")

# SMTP credentials
smtp_username = os.environ.get("SES_USER_ID")
smtp_password = os.environ.get("SES_PASSWORD")

# Sender and recipient addresses
sender_email = os.environ.get("SES_Sender_Email")

OTP = random.randint(100000,999999) 
global new_otp
new_otp = random.randint(100000,999999)

def send_email(email_info: dict):
    recipient_email = email_info.get("recipient_email")

    # Create the email message
    subject ="Confirmation of signup"
    body_text = "thanks for joining our website"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body_text, 'html'))

    # Attach a file
    attachment_path = email_info.get("attachment_path")

    if attachment_path is not None:
        attachment_filename = os.path.basename(attachment_path)
        with open(attachment_path, 'rb') as attachment:
            attachment_part = MIMEApplication(attachment.read())
            attachment_part.add_header('Content-Disposition', f'attachment; filename="{attachment_filename}"')
            msg.attach(attachment_part)

    # Send the email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
        
        return {
            "status": "success",
            "message": "Email sent successfully!"
        }
    except Exception as e:
        print("Error sending email:", str(e))
        return {
            "status": "failed",
            "message": f"Error sending email. Reason: {str(e)}"
        }
    

def sending_otp(recipient_email: dict):
    
    recipient_email = recipient_email.get("recipient_email")
    print(recipient_email)
    global new_otp
    new_otp = new_otp = random.randint(100000,999999)
    

    subject = "OTP verification for Forget password"
    body_text = "Uear User,"+"\n"+"\n"+"your OTP is "+str(new_otp)+"."
    message = f'subject:{subject}\n\n{body_text}'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'html'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
        print("OTP has been sent to"+recipient_email)
        print(new_otp)
        return {
            "status": "success",
            "message": "Email sent successfully!"
        }
    except Exception as e:
        print("Error sending email:", str(e))
        return {
            "status": "Failed to send Email",
            "message": f"Error sending email. Reason: {str(e)}"
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
def send_conversation_as_email(email_info: dict, conversation_data: str, conversation_name: str):
    recipient_email = email_info.get("recipient_email")

    # Create the email message
    subject = email_info.get("subject")
    body_text = email_info.get("email_body")
    

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body_text, 'html'))

    text_file = io.BytesIO(conversation_data.encode())

    # Attach a file
    attachment_part = MIMEApplication(text_file.read())
    attachment_part.add_header('Content-Disposition', f'attachment; filename={conversation_name+".txt"}')
    msg.attach(attachment_part)

    # Send the email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
        
        return {
            "status": "success",
            "message": "Email sent successfully!"
        }
    except Exception as e:
        print("Error sending email:", str(e))
        return {
            "status": "failed",
            "message": f"Error sending email. Reason: {str(e)}"
        }

