from django.db import models
from django.utils import timezone

# Create your models here.

complexity_choices = [
	('EASY', 'facil'),
	('MEDIUM', 'medio'),
	('DIFFICULT', 'dificil')
]

category_choices = [
	('verduras','verduras'),
	('pasta','pasta'),
	('carne','carne'),
	('especial','especial'),
	('guiso','guiso'),
	('postre','postre'),
	('pescado','pescado')
]

duration_choices = [
	('short','corto'),
	('medium','medio'),
	('long','largo')
]

class Meal(models.Model):
    name = models.CharField(default="",max_length=264, unique=True)
    category = models.CharField(default="",max_length=264, choices=category_choices, blank = True)
    ingredients = models.TextField(blank = True)
    complexity = models.CharField(default="",max_length=264, choices=complexity_choices, blank = True)
    duration = models.CharField(default="",max_length=264, choices=duration_choices, blank = True)
    link = models.URLField(default="", blank = True)
    is_new = models.BooleanField(default=True, blank = True)
    image_name = models.CharField(default="",max_length=264, blank = True)
    image = models.ImageField(upload_to='images', blank = True)
    is_preferred = models.BooleanField(default=False, blank = True)

    def __str__(self):
        return self.name

# class Webpage(models.Model):
#     topic = models.ForeignKey(Topic,on_delete=models.CASCADE)
#     name = models.CharField(max_length=264, unique=True)
#     url = models.URLField(unique=True)


#     def __str__(self):
#         return self.name


class Dates(models.Model):
    name = models.ForeignKey('app.Meal', on_delete=models.CASCADE, related_name='dates', blank = True)
    date = models.DateField(auto_now=True, blank = True)


    def __str__(self):
        return str(self.date)

adults_names = [
    ('opa', 'opa'),
    ('tante Ria','tante Ria'),
    ('abuelos', 'abuelos'),
    ('otro', 'otro'),
]

children_names = [
    ('Luka', 'Luka'),
    ('Alex', 'Alex'),
    ('David', 'David'),
]

cadeau_amount = [
    (1,1),
    (5,5),
    (15,15),
    (20,20),
    (30,30),
    (40,40),
    (50,50),
    (100,100),
    (200,200),
    (300,300),
    (500,500),
]

class Cadeau(models.Model):
    name = models.CharField(default="",max_length=264, choices=adults_names, blank = True)
    child = models.CharField(default="",max_length=264, choices=children_names, blank = True)
    amount = models.IntegerField(default="",choices=cadeau_amount)
    date = models.DateField(default=timezone.now)
    def __str__(self):
        return self.name
