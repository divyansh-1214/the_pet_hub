from .views import *
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()
router.register('findvet',UserViewSet, basename='findvet')
urlpatterns = router.urls
# from django.urls import path,include
# urlpatterns = [
#     path('', home, name='home'),
# ]