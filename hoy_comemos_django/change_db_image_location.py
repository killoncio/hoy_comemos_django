import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE','hoy_comemos_django.settings')

import django
# Import settings
django.setup()

from app.models import Meal

meals = Meal.objects.all()

def populate(mealsList):
    '''
    Create N Entries of Dates Accessed
    '''
    for i in range(len(mealsList)):

        mealsList[i].image = "images/" + mealsList[i].image_name
        mealsList[i].save()

if __name__ == '__main__':
    print("changing path of images...Please Wait")
    populate(meals)
    print('Populating Complete')
