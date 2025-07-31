from django.contrib import admin
from .models import Client, Invoice, LineItem

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone']
    search_fields = ['name', 'email']

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'client', 'user', 'status', 'created_at']
    list_filter = ['status', 'created_at', 'user']
    search_fields = ['invoice_number', 'client__name']

@admin.register(LineItem)
class LineItemAdmin(admin.ModelAdmin):
    list_display = ['invoice', 'description', 'quantity', 'unit_price']