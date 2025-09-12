from rest_framework import serializers
from .models import *
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id','Title','Category','Content','Tags','Author')
        Title = models.CharField(max_length=100, unique=False, default="")