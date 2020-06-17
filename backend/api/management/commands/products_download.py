from django.core.management import BaseCommand
from api.models import Product, ProductCount
from random import randint

class Command(BaseCommand):
	help = u"Uploads all of the products in the file"

	def add_arguments(self, parser):
		parser.add_argument('--file', dest='input', type=str)

	def handle(self, *args, **options):
		
		if len(ProductCount.objects.all()) < 1:
			p = ProductCount.objects.create()
			p.save()

		with open(options["input"],"r") as f:
			line = f.readline()
			while line:
				arr = line.split(";")
				p = Product()
				p.categoryId = int(arr[0])
				p.name = arr[1]
				p.description = arr[2]
				p.price = int(arr[3]) * 20
				p.image = arr[4]
				p.cpu = arr[5]
				p.camera = arr[6]
				p.size = arr[7]
				p.weight = arr[8]
				p.display = arr[9]
				p.battery = arr[10]
				p.memory = arr[11]
				p.rating = randint(35, 50)/10
				p.reviews = randint(2, 5)
				p.save()
				line = f.readline()