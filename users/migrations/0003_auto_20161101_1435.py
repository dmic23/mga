# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-11-01 19:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_studentplan_studentplanfile'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentplan',
            name='plan_section',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name='studentplan',
            name='plan_week',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
