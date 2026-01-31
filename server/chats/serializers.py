from rest_framework import serializers
from .models import Chat

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'guest', 'chat_date', 'notes']
        read_only_fields = ['id']
