from django.db import models

class Chat(models.Model):
    guest = models.CharField(max_length=50)
    chat_date = models.DateField("date chatted")
    notes = models.TextField()