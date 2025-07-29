from django.shortcuts import render
from .models import Invoice

def dashboard(request):
    invoices = Invoice.objects.all().order_by('-created_at')
    return render(request, 'core/dashboard.html', {'invoices': invoices})
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Invoice

@api_view(['GET'])
def invoice_list(request):
    """
    API endpoint that returns all invoices with totals.
    """
    invoices = Invoice.objects.all().order_by('-created_at')
    data = []
    for invoice in invoices:
        data.append({
            'id': invoice.id,
            'client': invoice.client.name,
            'invoice_number': invoice.invoice_number,
            'amount': float(invoice.total()),
            'status': invoice.status,
            'due_date': invoice.due_date.strftime('%Y-%m-%d') if invoice.due_date else None,
        })
    return Response(data)
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@api_view(['POST'])
@parser_classes([JSONParser])
@csrf_exempt
def create_invoice(request):
    """
    API endpoint to create a new invoice.
    Expects JSON with: client_name, invoice_number, status, due_date
    """
    try:
        data = request.data

        # Create or get client
        client, created = Client.objects.get_or_create(
            name=data['client_name'],
            defaults={'email': 'noemail@example.com'}
        )

        # Create invoice
        invoice = Invoice.objects.create(
            client=client,
            invoice_number=data['invoice_number'],
            status=data.get('status', 'pending'),
            due_date=data['due_date']
        )

        return JsonResponse({
            'id': invoice.id,
            'message': 'Invoice created successfully'
        }, status=201)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)