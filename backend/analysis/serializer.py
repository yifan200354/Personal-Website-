from rest_framework import serializers
from .models import Data

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ('class_year', 'attend_brown_or_risd', 'board_membership', 'is_executive_board_member',
                    'is_new_staffer_this_semester', 'ethnicity', 'is_fgli', 'gender',
                    'sexual_orientation', 'is_international', 'country')