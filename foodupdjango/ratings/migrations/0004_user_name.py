# Generated by Django 4.2 on 2023-04-28 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0003_post_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.TextField(blank=True),
        ),
    ]
