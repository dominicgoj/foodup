# Generated by Django 4.2 on 2023-05-08 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0015_alter_user_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivationCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('code', models.CharField(max_length=5)),
            ],
        ),
    ]
