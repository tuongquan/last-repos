from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers

from .models import Category, Product, Type, Image, Tag, Comment, User, Rating, ProductView, Like, Order


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(ModelSerializer):
    avatar = serializers.SerializerMethodField(source='avatar')

    def get_avatar(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = Product
        fields = ["active", "id", "name", "price", "avatar", "category", "type", "created_date"]


class TypeSerializer(ModelSerializer):
    class Meta:
        model = Type
        exclude = ["updated_date"]


class ImageSerializer(ModelSerializer):
    link = serializers.SerializerMethodField(source='link')

    def get_link(self, obj):
        request = self.context['request']
        path = '/static/%s' % obj.link.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Image
        fields = ['id', 'name', 'created_date', 'link', 'product']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class ProductDetailSerializer(ProductSerializer):
    tags = TagSerializer(many=True)
    rate = SerializerMethodField()

    def get_rate(self, product):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            r = product.rating_set.filter(user=request.user).first()
            if r:
                return r.rate

        return -1

    def get_avatar(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = ProductSerializer.Meta.model
        fields = ProductSerializer.Meta.fields + ['description', 'tags', 'images', 'rate']


# class CreateCommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['content', 'product', 'customer']


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source='avatar')

    def get_avatar(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):

            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'username', 'password', 'email',
                  'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, comment):
        return UserSerializer(comment.user, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'product', 'user']


class AuthProductDetailSerializer(ProductDetailSerializer):
    like = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_like(self, product):
        request = self.context.get('request')
        if request:
            return product.like_set.filter(user=request.user, active=True).exists()

    def get_rating(self, product):
        request = self.context.get('request')
        if request:
            r = product.rating_set.filter(user=request.user).first()
            if r:
                return r.rate

    class Meta:
        model = Product
        fields = ProductDetailSerializer.Meta.fields + ['like', 'rating']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'rate', 'created_date']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'active', 'created_date']


class ProductViewSerializer(ModelSerializer):
    class Meta:
        model = ProductView
        fields = ['id', 'views', 'product']


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'created_date', 'unit_price', 'quantity', 'discount', 'user', 'product']