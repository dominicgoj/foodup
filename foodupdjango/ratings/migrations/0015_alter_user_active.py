# Generated by Django 4.2 on 2023-05-03 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0014_remove_user_log_user_active_alter_restaurant_qr_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]