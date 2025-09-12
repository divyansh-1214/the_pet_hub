from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from .models import *
from .serializers import *

# Create your views here.
def home(request):
    return HttpResponse("this is home page")

class PetViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Pet objects.
    """
    permission_classes = [permissions.AllowAny]
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        pet = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(pet)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pet = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(pet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        pet = get_object_or_404(self.queryset, pk=pk)
        pet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)