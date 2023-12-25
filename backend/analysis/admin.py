from django.contrib import admin
from import_export.admin import ImportMixin, ExportMixin
from .models import Data
from .resources import DataResource

class DataAdmin(ImportMixin, ExportMixin, admin.ModelAdmin):
    resource_class = DataResource
    list_display = ['class_year', 'attend_brown_or_risd', 'board_membership', 'is_executive_board_member',
                    'is_new_staffer_this_semester', 'ethnicity', 'is_fgli', 'gender',
                    'sexual_orientation', 'is_international', 'country']

admin.site.register(Data, DataAdmin)