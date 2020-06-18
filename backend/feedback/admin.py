from django.contrib import admin
from feedback.models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
	list_display = ('first_name', 'description', 'rating', 'date_commented')
