from account.api.serializers import RegistrationSerializer
from account.models import Account

class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class = RegistrationSerializer

