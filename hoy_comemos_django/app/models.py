from django.db import models

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

    def __str__(self):
        return self.name

# class Webpage(models.Model):
#     topic = models.ForeignKey(Topic,on_delete=models.CASCADE)
#     name = models.CharField(max_length=264, unique=True)
#     url = models.URLField(unique=True)


#     def __str__(self):
#         return self.name


class Dates(models.Model):
    name = models.ForeignKey('app.Meal', on_delete=models.CASCADE, related_name='dates')
    date = models.DateField() 


    def __str__(self):
        return str(self.date)
