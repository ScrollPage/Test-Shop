from django.contrib import admin
from account.models import Account, MyToken

@admin.register(Account)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('email', 'first_name', 'last_name', 'phone_number', 'date_joined', 'last_login', 'is_admin')

@admin.register(MyToken)
class MytokenAdmin(admin.ModelAdmin):
	list_display = ('user', 'token', 'created')

