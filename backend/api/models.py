from django.db import models

# Create your models here.
class User(models.Model):
    First_name = models.CharField(max_length=100, unique=True, default="")
    Last_name = models.CharField(max_length=100, unique=True, default="")
    Uname = models.CharField(max_length=100, default="")
    mail = models.EmailField(unique=True, default="")
    password = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.First_name