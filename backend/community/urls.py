from .views import *
from rest_framework.routers import DefaultRouter 
from django.urls import path,include
router = DefaultRouter()
router.register('post',UserViewSet, basename='post')
urlpatterns = router.urls

# urlpatterns = [
#     path('', home, name='home'),
# ]