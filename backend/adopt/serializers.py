from rest_framework import serializers
from .models import *
class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ('id','name', 'type', 'breed', 'age','gender','size','color','location','shelter','description','personality',
                  'goodWith','specialNeeds','adoptionFee','images','vaccinated','spayedNeutered','houseTrained','datePosted')
