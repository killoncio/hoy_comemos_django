from django.forms import ModelForm
from django.core import validators
from app.models import Meal

class MealForm(ModelForm):
	class Meta:
		model = Meal
		fields = '__all__'

