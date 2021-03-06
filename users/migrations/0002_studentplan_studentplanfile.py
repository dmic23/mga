# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-11-01 19:21
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plan_week', models.DecimalField(decimal_places=2, max_digits=5)),
                ('plan_title', models.CharField(blank=True, max_length=50, null=True)),
                ('plan_description', models.TextField(blank=True, null=True)),
                ('plan_notes', models.TextField(blank=True, null=True)),
                ('plan_created', models.DateTimeField(auto_now_add=True)),
                ('plan_updated', models.DateTimeField(auto_now_add=True)),
                ('plan_created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='plan_created_user', to=settings.AUTH_USER_MODEL)),
                ('plan_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='plan_updated_user', to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(blank=True, related_name='plan_student', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentPlanFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plan_file', models.FileField(blank=True, null=True, upload_to=users.models.get_upload_file_name)),
                ('plan_file_name', models.CharField(blank=True, max_length=100, null=True)),
                ('plan_file_created', models.DateTimeField(auto_now_add=True)),
                ('plan_file_updated', models.DateTimeField(auto_now=True)),
                ('plan_file_created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='plan_file_added_user', to=settings.AUTH_USER_MODEL)),
                ('plan_file_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='plan_file_updated_user', to=settings.AUTH_USER_MODEL)),
                ('student_plan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='student_plan_file', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
