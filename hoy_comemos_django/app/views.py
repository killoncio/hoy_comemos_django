from django.shortcuts import render, get_object_or_404, redirect
from app.models import Meal, Dates
from .forms import MealForm, DateForm
from django.utils import timezone

# Create your views here.

def index(request):
	meals_list = Meal.objects.order_by('name')
	meals_dict = {'meals_list': meals_list}

	return render(request,'app/index.html',context=meals_dict)

def add_meal(request):
	form = MealForm()

	if request.method == "POST":
		form = MealForm(request.POST, request.FILES)
		if form.is_valid():
			form.save(commit=True)
			return index(request)
		else:
			print('ERROR FORM INVALID')

	return render(request,'app/add_meal.html',{'form':form})

def modify_meal(request, id):
	meal = get_object_or_404(Meal, id=id)
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
		form = MealForm(request.POST, request.FILES, instance = meal)
		if form.is_valid():
			form.save(commit=True)
			meal_dict = {'meal': meal}
			return render(request,'app/meal.html',context=meal_dict)
		else:
			print('ERROR FORM INVALID')

	return render(request,'app/modify_meal.html',{'form':form})

def meal(request,id):
	meal = get_object_or_404(Meal, id=id)
	form = DateForm()

	if request.method == "POST":
		form = DateForm(request)
		if form.is_valid():
			date = form.save(commit=False)
			date.name = meal
			form.save(commit=True)
		else:
			print(request.POST)
			print('ERROR FORM INVALID')

	meal_dict = {'meal': meal}

	return render(request,'app/meal.html',context=meal_dict)


