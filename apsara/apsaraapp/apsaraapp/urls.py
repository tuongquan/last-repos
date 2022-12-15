from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework import routers

schema_view = get_schema_view(
    openapi.Info(
        title="Apsara API",
        default_version='v1',
        description="APIs for CourseApp",
        contact=openapi.Contact(email="nguyenquan10042001@gmail.com"),
        license=openapi.License(name="admin"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [

    path('', include('apsaras.urls')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('admin/', admin.site.urls),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0),
            name='schema-json'),
    re_path(r'^swagger/$',
            schema_view.with_ui('swagger', cache_timeout=0),
    name = 'schema-swagger-ui'),
    re_path(r'^redoc/$',
        schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),

]
