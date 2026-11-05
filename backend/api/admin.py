from django.contrib import admin
from .models import (
    Role, UserProfile, Fabric, Accessory,
    ModelItem, ModelAccessory, ModelTimeline,
    CuttingRecord, QCRecord, PrintDispatch,
    SewingDispatch, AppNotification, InternalMessage
)

# تسجيل النماذج لتظهر داخل لوحة الإدارة http://127.0.0.1:8000/admin/
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'real_name', 'role', 'is_sudo', 'is_active')
    list_filter = ('is_sudo', 'is_active', 'role')

@admin.register(Fabric)
class FabricAdmin(admin.ModelAdmin):
    list_display = ('name', 'color', 'quantity_kg', 'supplier', 'price_per_meter')
    search_fields = ('name', 'color', 'supplier')

@admin.register(Accessory)
class AccessoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'usage_type', 'current_stock', 'min_threshold', 'custom_model_code')
    list_filter = ('usage_type', 'withdrawn_for_model')

@admin.register(ModelItem)
class ModelItemAdmin(admin.ModelAdmin):
    list_display = ('model_code', 'model_type', 'status', 'target_cut_quantity', 'total_cut_pieces')
    list_filter = ('status', 'model_type')
    search_fields = ('model_code',)

@admin.register(CuttingRecord)
class CuttingRecordAdmin(admin.ModelAdmin):
    list_display = ('model', 'fabric_color', 'cutter_name', 'pieces_count', 'created_at')

@admin.register(QCRecord)
class QCRecordAdmin(admin.ModelAdmin):
    list_display = ('model', 'stage', 'counted_pieces', 'defect_pieces', 'checked_by')

@admin.register(PrintDispatch)
class PrintDispatchAdmin(admin.ModelAdmin):
    list_display = ('model', 'print_house', 'pieces_count', 'status', 'expected_delivery_date')

@admin.register(SewingDispatch)
class SewingDispatchAdmin(admin.ModelAdmin):
    list_display = ('model', 'workshop_name', 'piece_type', 'pieces_count', 'status')

@admin.register(InternalMessage)
class InternalMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'content', 'is_read', 'created_at')

@admin.register(AppNotification)
class AppNotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'urgency', 'stage', 'model', 'expected_date')