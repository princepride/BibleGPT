import hmac
import time
import hashlib
import smtplib
from email.message import EmailMessage



def shop_auth_shopee_sg():
    host = "https://partner.shopeemobile.com"
    partner_id = 1056016
    tmp_partner_key = "43506d67416c67527661494556434d6b57494c63494c616c4b5277524c514b43"
    timest = int(time.time())
    path = "/api/v2/shop/auth_partner"
    redirect_url = "https://open.shopee.com"
    partner_key = tmp_partner_key.encode()
    tmp_base_string = "%s%s%s" % (partner_id, path, timest)
    base_string = tmp_base_string.encode()
    sign = hmac.new(partner_key, base_string, hashlib.sha256).hexdigest()
    ##generate api
    url = host + path + "?partner_id=%s&timestamp=%s&sign=%s&redirect=%s" % (partner_id, timest, sign, redirect_url)
    print(url)
    send_email(url, "Shopee Auth URL")

def shop_auth_lazada_sg():
    redirect_uri = "https://open.lazada.com"
    client_id = 119090
    url = "https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=%s&client_id=%s" % (redirect_uri, client_id)
    print(url)
    send_email(url, "Lazada Auth URL")


def send_email(content, subject):
    # Email settings
    sender_email = "wangzhipeng628@gmail.com"
    receiver_email = "wangzhipeng628@gmail.com"
    password = "lxycghjrwpxqwshd"  # Change this to your real password
    
    # Set up the email
    msg = EmailMessage()
    msg.set_content(content)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email
    
    # Send the email
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)
            server.send_message(msg)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

# shop_auth_shopee_sg()
shop_auth_lazada_sg()