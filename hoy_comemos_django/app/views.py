from django.shortcuts import render
from app.models import Meal
from .forms import MealForm

# Create your views here.

def index(request):
	meals_list = Meal.objects.order_by('name')
	meals_dict = {'meals_list': meals_list}

	return render(request,'app/index.html',context=meals_dict)

def add_meal(request):
	form = MealForm()

	if request.method == "POST":
		form = MealForm(request.POST)
		if form.is_valid():
			form.save(commit=True)
			return index(request)
		else:
			print('ERROR FORM INVALID')

	return render(request,'app/add_meal.html',{'form':form})

def modify_meal(request, id):
	meal = Meal.objects.get(id=id)
	mealDetails = {
		'name': meal.name,
		'category':meal.category,
		'ingredients':meal.ingredients,
		'complexity':meal.complexity,
		'duration':meal.duration,
		'link':meal.link,
		'image_name':meal.image_name
	}

	form = MealForm(initial = mealDetails)

	if request.method == "POST":
		form = MealForm(request.POST, instance = meal)
		if form.is_valid():
			form.save(commit=True)
			return index(request)
		else:
			print('ERROR FORM INVALID')

	return render(request,'app/add_meal.html',{'form':form})
