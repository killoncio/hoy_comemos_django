from django.urls import path
from . import views

app_name = "app"

urlpatterns = [
	path('add/',views.add_meal,name='add_meal'),
	path('modify/<id>',views.modify_meal,name='modify_meal'),
	path('meal/<id>',views.meal,name='meal'),
	path('cadeau/',views.cadeau,name='cadeau'),
	path('cadeau_stats/',views.cadeau_stats,name='cadeau_stats'),
	path('ajax/get_meals/',views.get_meals,name='get_meals'),
]

# path('', views.index, name='index'),
