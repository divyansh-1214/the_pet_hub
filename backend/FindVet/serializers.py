from rest_framework import serializers
from .models import *
class FindVetSerializer(serializers.ModelSerializer):
    class Meta:
        model = VeterinaryClinic
        fields = ('id','name','specialties','emergency_24_7','address','city','state','postal_code','phone','distance_miles','image',"services")
        Title = models.CharField(max_length=100, unique=False, default="")
