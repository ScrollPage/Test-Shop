from django.contrib import admin
from account.models import Account, MyToken

@admin.register(Account)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('email', 'username', 'date_joined', 'last_login', 'is_admin')

@admin.register(MyToken)
class MyTokenAdmin(admin.ModelAdmin):
<<<<<<< HEAD
	list_display = ('user', 'token', 'created')
=======
	list_display = ('user', 'token', 'created', 'is_used')
>>>>>>> 8355c4110e54323cc74ff7e5a2cababe86a887b9
