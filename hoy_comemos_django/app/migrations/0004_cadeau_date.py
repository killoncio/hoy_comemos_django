# Generated by Django 2.2.5 on 2020-12-29 12:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20201229_1105'),
    ]

    operations = [
        migrations.AddField(
            model_name='cadeau',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
