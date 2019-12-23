from django.shortcuts import render
from app.models import Meal
# Create your views here.

def index(request):
	meals_list = Meal.objects.order_by('name')
	meals_dict = {'meals_list': meals_list}

	return render(request,'app/index.html',context=meals_dict)