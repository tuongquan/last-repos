# Generated by Django 4.0.2 on 2022-08-04 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apsaras', '0009_product_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(null=True),
        ),
    ]
