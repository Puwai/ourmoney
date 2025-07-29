from django.contrib import admin
from .models import Client, Invoice, LineItem

class LineItemInline(admin.TabularInline):
    model = LineItem
    extra = 1

class InvoiceAdmin(admin.ModelAdmin):
    inlines = [LineItemInline]
    list_display = ('client', 'invoice_number', 'date', 'get_total')

    @admin.display(description='Total')
    def get_total(self, obj):
        return obj.total

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

admin.site.register(Client, ClientAdmin)
admin.site.register(Invoice, InvoiceAdmin)
