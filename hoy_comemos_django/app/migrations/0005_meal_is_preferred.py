# Generated by Django 2.2.5 on 2021-03-14 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_cadeau_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='is_preferred',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]