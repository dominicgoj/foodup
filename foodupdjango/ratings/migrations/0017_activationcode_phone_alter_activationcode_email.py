# Generated by Django 4.2 on 2023-05-08 19:13

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0016_activationcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='activationcode',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None),
        ),
        migrations.AlterField(
            model_name='activationcode',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]