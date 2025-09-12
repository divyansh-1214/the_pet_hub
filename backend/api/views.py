from django.http import HttpResponse
from rest_framework import viewsets,permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
# Create your views here.
def home(_):
    return HttpResponse("this is home page")

class UserViewSet(viewsets.ModelViewSet):
    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def list(self, _):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, _):
        serializer = self.serializer_class(data = _.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def retrieve(self, _, pk=None):
        user = self.queryset.get(pk=pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def update(self, _, pk=None):
        user = self.queryset.get(pk = pk)
        serializer = self.serializer_class(user,data = _.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def destroy(self, _, pk=None):
        user = self.queryset.get(pk=pk)
        user.delete()
        return Response(status=204)