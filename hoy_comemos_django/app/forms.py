from django.forms import ModelForm
from django.core import validators
from app.models import Meal, Dates, Cadeau

class MealForm(ModelForm):
	class Meta:
		model = Meal
		exclude = ['is_new','image_name']
		labels = {
		    'name' : 'Nombre',
		    'category' : 'Categoria',
		    'ingredients' : 'Ingredientes',
		    'complexity' : 'Complejidad',
		    'duration' : 'Duracion',
		    'link' : 'Link',
		}

class DateForm(ModelForm):
	class Meta:
		model = Dates
		exclude = ['date','name']

class CadeauForm(ModelForm):
	class Meta:
		model = Cadeau
		labels = {
			'name': 'Wie ben jij?',
			'child': 'Kind',
			'amount': 'How veel',
		}
		exclude = ['date']
