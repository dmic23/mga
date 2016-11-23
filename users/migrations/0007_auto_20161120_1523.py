# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-11-20 04:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20161120_0929'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentPlanSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_week', models.CharField(blank=True, max_length=3, null=True)),
                ('section_number', models.CharField(blank=True, max_length=3, null=True)),
                ('section_title', models.CharField(blank=True, max_length=50, null=True)),
                ('section_description', models.TextField(blank=True, null=True)),
                ('section_notes', models.TextField(blank=True, null=True)),
                ('section_created', models.DateTimeField(auto_now_add=True)),
                ('section_updated', models.DateTimeField(auto_now_add=True)),
                ('section_created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='section_created_user', to=settings.AUTH_USER_MODEL)),
                ('section_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='section_updated_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='studentplan',
            name='plan_notes',
        ),
        migrations.RemoveField(
            model_name='studentplan',
            name='plan_section',
        ),
        migrations.RemoveField(
            model_name='studentplan',
            name='plan_week',
        ),
        migrations.RemoveField(
            model_name='studentplanfile',
            name='student_plan',
        ),
        migrations.AddField(
            model_name='studentplansection',
            name='student_plan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plan_section', to='users.StudentPlan'),
        ),
        migrations.AddField(
            model_name='studentplanfile',
            name='plan_section',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='plan_section_file', to='users.StudentPlanSection'),
        ),
    ]
