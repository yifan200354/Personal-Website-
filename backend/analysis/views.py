# Create your views here.
from rest_framework import viewsets
from .serializer import AnalysisSerializer
from .models import Data

# Create your views here.

class DataView(viewsets.ModelViewSet):
    serializer_class = AnalysisSerializer
    queryset = Data.objects.all()