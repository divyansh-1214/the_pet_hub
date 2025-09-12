from django.db import models

# Create your models here.
class Post(models.Model):
    Title = models.CharField(max_length=100, unique=False, default="")
    Category = models.CharField(max_length=100, default='')
    Content = models.TextField(default="")
    Tags = models.CharField(max_length=100, default="")
    Author =  models.CharField(max_length=100, default="")
    def __str__(self):
        return self.Title