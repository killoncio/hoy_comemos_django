from django.forms import ModelForm
from django.core import validators
from app.models import Meal

class MealForm(ModelForm):
	class Meta:
		model = Meal
		fields = '__all__'
		labels = {
		    'name' : 'Nombre',
		    'category' : 'Categoria',
		    'ingredients' : 'Ingredientes',
		    'complexity' : 'Complejidad',
		    'duration' : 'Duracion',
		    'link' : 'Link',
		    'is_new' : 'Nuevo',
		    'image_name' : 'Imagen'
		}

