from django.forms import ModelForm
from django.core import validators
from app.models import Meal

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

