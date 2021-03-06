"""django_react_shop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from api import views
from django.conf.urls.static import static
from django.conf import settings
import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/<categoryId>/<page>/<amount>/<search>/<min>/<max>/<ordering>/", views.ProductListView.as_view(), name = "api_post_list"),
    path("items/api/id/<pk>", views.SingleProductView.as_view(), name = "single_product_view"),
    path("api/len/<categoryId>/<search>/<min>/<max>/", views.ProductsCountView.as_view(), name = "products_count_view"),
    path('all/', views.AllProductsView.as_view(), name = 'all_products'),
    path('product_edit/<uid>', views.ProductDataChange.as_view(), name = 'product_edit'),
    path('create_product', views.ProductCreateView.as_view(), name = 'create'),
    path('delete_product/<uid>', views.ProductDeleteView.as_view(), name = 'delete'),
    path('account/', include('account.api.urls')),
    path('acc/', include('account.urls')),
    path('cart/', include('cart.urls')),
    path('cart/api/', include('cart.api.urls')),
    path('feedback/', include('feedback.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns

