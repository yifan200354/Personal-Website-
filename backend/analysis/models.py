from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

class Data(models.Model):
    class_year = models.CharField(max_length=255)
    attend_brown_or_risd = models.CharField(max_length=255)
    board_membership = models.CharField(max_length=255)
    is_executive_board_member = models.CharField(max_length=255)
    is_new_staffer_this_semester = models.CharField(max_length=255)
    ethnicity = models.CharField(max_length=255)
    is_fgli = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    sexual_orientation = models.CharField(max_length=255)
    is_international = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.class_year