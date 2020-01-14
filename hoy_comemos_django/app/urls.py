from django.urls import path
from . import views

app_name = "app"

urlpatterns = [
	path('add/',views.add_meal,name='add_meal'),
	path('modify/<id>',views.modify_meal,name='modify_meal')
]

# path('', views.index, name='index'),
