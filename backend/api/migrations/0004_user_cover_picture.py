# Generated by Django 4.1.2 on 2022-10-26 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_display_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='cover_picture',
            field=models.URLField(blank=True, default=''),
        ),
    ]
