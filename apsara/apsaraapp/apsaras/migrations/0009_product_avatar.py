# Generated by Django 4.0.2 on 2022-08-03 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apsaras', '0008_alter_category_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='avatar',
            field=models.ImageField(null=True, upload_to='products/%Y/%m'),
        ),
    ]
