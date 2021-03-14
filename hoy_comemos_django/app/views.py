from django.shortcuts import render, get_object_or_404, redirect
from app.models import Meal, Dates, Cadeau
from .forms import MealForm, DateForm, CadeauForm
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.fields.files import ImageFieldFile
from django.contrib import messages

# Create your views here.

def index(request):
	# Could not think of a different way to sorter results as I wanted
	categories = [
		'verduras',
		'carne',
		'pasta',
		'pescado',
		'guiso',
		'especial',
		'postre',
	]

	meals_list = []

	for category in categories:
		list = Meal.objects.filter(category = category)
		meals_list.extend(list)

	meals_dict = {'meals_list': meals_list}

	return render(request,'app/index.html',context=meals_dict) # with vue
	# return render(request,'app/index_no_vue.html',context=meals_dict)

# Django does not handle properly image encoding, so it needs custom function
# https://stackoverflow.com/questions/7497138/how-do-i-serialize-an-imagefield-in-django
class ImageEncoder(DjangoJSONEncoder):
	def default(self,obj):
	    if isinstance(obj, ImageFieldFile):
	        try:
	            return obj.url
	        except ValueError:
	            return ''

	    raise TypeError(repr(obj) + " is not JSON serializable")

def get_meals(self):
	data = Meal.objects.all()
	response = {}
	# need dict instead of models for the json encoder to work
	count = 0
	for item in data:
		response[count] = model_to_dict(item)
		count+=1
	return JsonResponse(response, safe=False, encoder=ImageEncoder)

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

def cadeau(request):
	form = CadeauForm()

	if request.method == "POST":
		form = CadeauForm(request.POST)
		if form.is_valid():
			cadeau = form.save(commit=False)
			name = cadeau.name
			child = cadeau.child
			success_message = "Wow! Dank je wel " + name + ", van " + child
			form.save(commit=True)
			messages.success(request, success_message)
		else:
			print('ERROR FORM INVALID')

	return render(request,'app/cadeau.html',{'form':form})

def cadeau_stats(request):
	children = [
		'Luka',
		'David',
		'Alex',
	]

	cadeaus_list = {
		'Luka':[],
		'David':[],
		'Alex':[],
	}

	totals = {
		'Luka':0,
		'David':0,
		'Alex':0
	}

	for child in children:
		list = Cadeau.objects.filter(child = child)
		cadeaus_list[child].extend(list)
		# calculate and store total amount
		for cadeau in list:
			totals[child] += cadeau.amount

	cadeaus_dict = {
		'cadeaus_list': cadeaus_list,
		'totals': totals,
	}

	return render(request,'app/cadeau_stats.html',context=cadeaus_dict)
