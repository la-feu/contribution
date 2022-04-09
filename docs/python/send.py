from browser import document
import smtplib
# from email.mime.text import MIMEText
# from email.header import Header

sender = 'huooooosheeeee@163.com'
receivers = ['hanyx2006@qq.com']

def submit(fakeargs):
    # message = MIMEText('这是一封测试邮件，请忽略', 'plain', 'utf-8')
    # message['From'] = Header('测试发送', 'utf-8')
    # message['To'] = Header('测试接收', 'utf-8')
    # message['Subject'] = Header('这是一封测试邮件', 'utf-8')
    # try:
    #     smtpObj = smtplib.SMTP('smtp.163.com')
    #     smtpObj.sendmail(sender, receivers, message.as_string())
    #     print('succeeded')
    # except:
    #     print('failed')
    pass

document['submit'].bind('click', submit)
