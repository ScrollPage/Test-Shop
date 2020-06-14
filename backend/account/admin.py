from django.contrib import admin
from account.models import Account, MyToken

@admin.register(Account)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('email', 'username', 'date_joined', 'last_login', 'is_admin')

@admin.register(MyToken)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('user', 'token', 'created', 'is_used')