# Generated by Django 4.2 on 2023-04-29 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0008_alter_restaurant_telephone_alter_user_telephone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='log',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
