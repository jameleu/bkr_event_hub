# from allauth.account.models import EmailAddress, EmailConfirmation
# from allauth.account.utils import user_email
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
# from allauth.account.utils import send_email_confirmation
from django.contrib.auth.models import User
from django.utils.encoding import force_bytes
# from allauth.account.adapter import get_adapter
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
import six

class CustomTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        # Use a default value if the user has no password
        password = user.password if user.password else ''
        return six.text_type(user.pk) + password + six.text_type(timestamp)

custom_token_generator = CustomTokenGenerator()
def send_custom_email_confirmation(request, user, create=False, email=""):
    # email = user_email(user)
    # must pass email or user
    # make safe for url
    one_time_token = custom_token_generator.make_token(user)
    current_site = get_current_site(request)
    site_name = current_site.name
    domain = current_site.domain
    # edit the site name and domain in the Site db

    context = {
        "user": user,
        "first": user.first_name,
        "last": user.last_name,
        "site_name": site_name,
        "domain": domain,
        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
        "token": one_time_token,
        "protocol": 'https' if request.is_secure() else 'http',
    }
    if create:  # are creating user for first time
        print("creating new user with default send email")
        email_template = 'account/email/email_confirmation_message.html'
        send_mail(subject="UMich Great UofM Baking Club: Verify Your Email", message="", html_message=html_content, from_email="gmbc@no_reply.com", recipient_list=[email])
        
    else:
        email_template = 'account/email/one_time_login_message.html'
        html_content = render_to_string(email_template, context)

        send_mail(subject="UMich Great UofM Baking Club: Your One-Time Login Link", message="", html_message=html_content, from_email="gmbc@no_reply.com", recipient_list=[email])
