from django.db import migrations, models


def populate_categories(apps, schema_editor):
    Category = apps.get_model('event', 'Category')
    Category.objects.bulk_create([
        Category(name='Cookies'),
        Category(name='Cake'),
        Category(name='Bread'),
        Category(name='Egg'),
        Category(name='Decorating'),
        Category(name='MDining'),
        Category(name='Chem'),
        Category(name='Pastry'),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('event', '0006_categories'),
    ]

    operations = [
        migrations.RunPython(populate_categories)
    ]
