from rest_framework import viewsets
from .models import Chat
from .serializers import ChatSerializer

class ChatViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows coffee chats to be viewed, created, edited, or deleted.
    Provides full CRUD operations via ModelViewSet.    
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer